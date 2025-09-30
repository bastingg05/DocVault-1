const { Router } = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Document = require('../models/Document');
const { requireAuth } = require('../middleware/auth');

const router = Router();

const uploadsDir = path.join(process.cwd(), 'uploads');
fs.mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname) || '';
    cb(null, `${unique}${ext}`);
  },
});

function fileFilter(req, file, cb) {
  const allowed = ['application/pdf', 'image/jpeg', 'image/png', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  if (allowed.includes(file.mimetype)) cb(null, true); else cb(new Error('Unsupported file type'));
}

const upload = multer({ storage, fileFilter, limits: { fileSize: 10 * 1024 * 1024 } });

router.use(requireAuth);

router.post('/', upload.single('file'), async (req, res) => {
  try {
    const { name, category, notes, expiryDate } = req.body;
    if (!req.file) return res.status(400).json({ message: 'File is required' });
    const doc = await Document.create({
      userId: req.user.id,
      name,
      category,
      notes: notes || '',
      storagePath: path.join('uploads', req.file.filename),
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      size: req.file.size,
      expiryDate: expiryDate ? new Date(expiryDate) : undefined,
    });
    res.json({ id: doc._id });
  } catch (err) {
    res.status(500).json({ message: 'Upload failed' });
  }
});

router.get('/', async (req, res) => {
  try {
    const { q, category } = req.query;
    const match = { userId: req.user.id };
    if (q) match.name = { $regex: String(q), $options: 'i' };
    if (category) match.category = category;
    const items = await Document.find(match).sort({ createdAt: -1 }).lean();
    const withLinks = items.map(d => ({ ...d, downloadUrl: `/${d.storagePath.replace(/\\/g, '/')}` }));
    res.json({ items: withLinks });
  } catch (err) {
    res.status(500).json({ message: 'Failed to list documents' });
  }
});

// Update a document (metadata and optional file replacement)
router.put('/:id', upload.single('file'), async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await Document.findOne({ _id: id, userId: req.user.id });
    if (!existing) return res.status(404).json({ message: 'Not found' });

    const { name, category, notes, expiryDate } = req.body;

    // Prepare updates only for provided fields
    const updates = {};
    if (typeof name === 'string' && name.trim()) updates.name = name.trim();
    if (typeof category === 'string' && category.trim()) updates.category = category.trim();
    if (typeof notes === 'string') updates.notes = notes;
    if (typeof expiryDate === 'string' && expiryDate) {
      const d = new Date(expiryDate);
      if (!isNaN(d.getTime())) updates.expiryDate = d; else updates.expiryDate = undefined;
    }

    // If file uploaded, replace on disk and update metadata
    if (req.file) {
      // remove old file if any
      if (existing.storagePath) {
        const prev = path.join(process.cwd(), existing.storagePath);
        try { if (fs.existsSync(prev)) fs.unlinkSync(prev); } catch {}
      }
      updates.storagePath = path.join('uploads', req.file.filename);
      updates.originalName = req.file.originalname;
      updates.mimeType = req.file.mimetype;
      updates.size = req.file.size;
    }

    await Document.updateOne({ _id: id, userId: req.user.id }, { $set: updates });

    const updated = await Document.findById(id).lean();
    const withLink = { ...updated, downloadUrl: `/${updated.storagePath.replace(/\\/g, '/')}` };
    res.json({ ok: true, item: withLink });
  } catch (err) {
    res.status(500).json({ message: 'Update failed' });
  }
});

// Delete a document and its file
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await Document.findOne({ _id: id, userId: req.user.id });
    if (!doc) return res.status(404).json({ message: 'Not found' });
    // Remove file if exists
    if (doc.storagePath) {
      const filePath = path.join(process.cwd(), doc.storagePath);
      try { if (fs.existsSync(filePath)) fs.unlinkSync(filePath); } catch {}
    }
    await Document.deleteOne({ _id: id, userId: req.user.id });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ message: 'Delete failed' });
  }
});

module.exports = router;


