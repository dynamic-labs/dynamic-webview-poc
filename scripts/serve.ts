import express from 'express';

const port = 3000;

const app = express();

app.get('/.well-known/apple-app-site-association', (req, res) => {
  res.json({
    webcredentials: {
      apps: ['4PXN5W4A4C.xyz.dynamic.MobileDemo'],
    },
  });
});

app.use(express.static('dist/apps/webview-host'));

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
