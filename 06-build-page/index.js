const path = require('node:path');
const fs = require('node:fs');

const dirPath = path.join(__dirname, '06-build-page');

async function buildPage() {
  const distPath = path.join(dirPath, 'project-dist');
  await fs.mkdir(distPath);

  const stylesPath = path.join(dirPath, 'styles');
  const stylePath = path.join(distPath, 'style.css');
  const styleFiles = await fs.readdir(stylesPath);
  const styleData = await Promise.all(styleFiles.map(async (file) => {
    const filePath = path.join(stylesPath, file);
    if (path.extname(filePath) !== '.css') {
      throw new Error(`File ${file} is not CSS`);
    }
    return await fs.readFile(filePath, 'utf8');
  }));
  await fs.writeFile(stylePath, styleData.join('\n'));

  const assetsPath = path.join(dirPath, 'assets');
  const assetsDistPath = path.join(distPath, 'assets');
  await fs.mkdir(assetsDistPath);
  const assetFiles = await fs.readdir(assetsPath);
  await Promise.all(assetFiles.map(async (file) => {
    const srcPath = path.join(assetsPath, file);
    const destPath = path.join(assetsDistPath, file);
    await fs.copyFile(srcPath, destPath);
  }));

  const templatePath = path.join(dirPath, 'template.html');
  const templateData = await fs.readFile(templatePath, 'utf8');
  const componentFiles = await fs.readdir(path.join(dirPath, 'components'));
  let htmlData = templateData;
  await Promise.all(componentFiles.map(async (file) => {
    const componentName = path.parse(file).name;
    const componentTag = `{{${componentName}}}`;
    if (!htmlData.includes(componentTag)) {
      return;
    }
    const componentData = await fs.readFile(path.join(dirPath, 'components', file), 'utf8');
    htmlData = htmlData.replace(new RegExp(componentTag, 'g'), componentData);
  }));

  const indexPath = path.join(distPath, 'index.html');
  await fs.writeFile(indexPath, htmlData);
}

buildPage();