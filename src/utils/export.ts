import { saveAs } from 'file-saver';
import HTMLToRTF from 'html-to-rtf';

export type ExportFormat = 'txt' | 'rtf' | 'gdoc';

interface ExportOptions {
  content: string;
  type: string;
  filename?: string;
}

export const exportContent = async ({ content, type, filename }: ExportOptions) => {
  const timestamp = new Date().toISOString().split('T')[0];
  const defaultFilename = `${type}-${timestamp}`;
  const finalFilename = filename || defaultFilename;

  const htmlContent = convertToHTML(content);
  
  return {
    txt: () => exportTXT(content, finalFilename),
    rtf: () => exportRTF(htmlContent, finalFilename),
    gdoc: () => exportToGoogleDocs(content, finalFilename),
  };
};

const convertToHTML = (content: string): string => {
  // Convert plain text to HTML preserving formatting
  return content
    .split('\n')
    .map(line => {
      if (line.trim().startsWith('#')) {
        return `<h1>${line.replace('#', '').trim()}</h1>`;
      }
      if (line.trim().startsWith('##')) {
        return `<h2>${line.replace('##', '').trim()}</h2>`;
      }
      if (line.trim().startsWith('*')) {
        return `<li>${line.replace('*', '').trim()}</li>`;
      }
      return `<p>${line}</p>`;
    })
    .join('\n');
};

const exportTXT = (content: string, filename: string) => {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  saveAs(blob, `${filename}.txt`);
};

const exportRTF = (htmlContent: string, filename: string) => {
  const rtfContent = HTMLToRTF.convertHtmlToRtf(htmlContent);
  const blob = new Blob([rtfContent], { type: 'application/rtf' });
  saveAs(blob, `${filename}.rtf`);
};

const exportToGoogleDocs = async (content: string, filename: string) => {
  // Create a temporary link that opens Google Docs in a new tab
  const encodedContent = encodeURIComponent(content);
  const googleDocsUrl = `https://docs.google.com/document/create?title=${encodeURIComponent(filename)}&body=${encodedContent}`;
  window.open(googleDocsUrl, '_blank');
};