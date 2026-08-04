import { useTranslation } from 'react-i18next';

interface ProductNode {
  title: string;
  domain: string;
  status: string;
}

const positions = [
  { x: 92, y: 78 },
  { x: 294, y: 54 },
  { x: 235, y: 164 },
  { x: 438, y: 151 },
  { x: 349, y: 277 },
  { x: 95, y: 267 },
];

const connections = [[0, 1], [0, 2], [0, 5], [1, 2], [1, 3], [2, 3], [2, 4], [2, 5], [3, 4], [4, 5]];

export default function SystemsMap() {
  const { t } = useTranslation();
  const products = Object.values(
    t('projects.items', { returnObjects: true }) as Record<string, ProductNode>,
  );

  return (
    <figure className="systems-map">
      <figcaption className="systems-map__caption">
        <span>{t('projects.eyebrow')}</span>
        <span>01—06</span>
      </figcaption>
      <svg
        className="systems-map__svg"
        viewBox="0 0 530 330"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <pattern id="atlas-grid" width="26" height="26" patternUnits="userSpaceOnUse">
            <path d="M 26 0 L 0 0 0 26" className="systems-map__grid-line" />
          </pattern>
        </defs>
        <rect width="530" height="330" fill="url(#atlas-grid)" />
        <path className="systems-map__contour" d="M-12 108C62 23 140 29 197 91s121 53 171-5 118-35 177 14" />
        <path className="systems-map__contour" d="M-18 145C67 67 137 70 191 119s120 51 180-4 116-27 174 19" />
        <path className="systems-map__contour" d="M-10 225c80-54 150-47 207 1s125 50 174 1 106-52 174-7" />
        {connections.map(([from, to]) => (
          <line
            key={`${from}-${to}`}
            className="systems-map__connection"
            x1={positions[from].x}
            y1={positions[from].y}
            x2={positions[to].x}
            y2={positions[to].y}
          />
        ))}
        {products.map((product, index) => (
          <g
            className={index === products.length - 1 ? 'systems-map__node systems-map__node--building' : 'systems-map__node'}
            key={product.title}
            transform={`translate(${positions[index].x} ${positions[index].y})`}
          >
            <circle r="19" />
            <text className="systems-map__node-number" textAnchor="middle" dy="4">
              {String(index + 1).padStart(2, '0')}
            </text>
            <text className="systems-map__node-label" x="27" y="5">
              {product.title}
            </text>
          </g>
        ))}
      </svg>
      <ol className="systems-map__legend">
        {products.map((product, index) => (
          <li key={product.title}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <div>
              <strong>{product.title}</strong>
              <small>{product.domain}</small>
            </div>
          </li>
        ))}
      </ol>
    </figure>
  );
}
