import type { APIRoute } from 'astro';
import { getSoundFiles } from '../../../../lib/';

export async function getStaticPaths() {
  const sounds = getSoundFiles();

  const paths = [];
  for (const folder in sounds) {
    for (const sound of sounds[folder]) {
      const fileName = sound.location.split("/").pop();
      paths.push({
        params: { folder, sound: fileName },
        props: { soundName: sound.name, folder },
      });
    }
  }

  return paths;
}

export const GET: APIRoute = async ({ props }) => {
  const { soundName, folder } = props as { soundName: string; folder: string };

  const svg = `
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#ef5350;stop-opacity:1" />
          <stop offset="14%" style="stop-color:#f48fb1;stop-opacity:1" />
          <stop offset="28%" style="stop-color:#7e57c2;stop-opacity:1" />
          <stop offset="42%" style="stop-color:#2196f3;stop-opacity:1" />
          <stop offset="56%" style="stop-color:#26c6da;stop-opacity:1" />
          <stop offset="70%" style="stop-color:#43a047;stop-opacity:1" />
          <stop offset="84%" style="stop-color:#f9a825;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#ff5722;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="1200" height="630" fill="#212529"/>
      <text x="600" y="250" font-family="Arial, sans-serif" font-size="48" font-weight="bold"
            text-anchor="middle" fill="url(#gradient)">
        Soundboard
      </text>
      <text x="600" y="350" font-family="Arial, sans-serif" font-size="64" font-weight="bold"
            text-anchor="middle" fill="white">
        ${soundName}
      </text>
      <text x="600" y="450" font-family="Arial, sans-serif" font-size="32"
            text-anchor="middle" fill="#aaa">
        ${folder}
      </text>
    </svg>
  `;

  return new Response(svg, {
    status: 200,
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
