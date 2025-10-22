import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { useEffect, useState } from 'react';
import { codeToHtml } from 'shiki';

/**
 * Componente para renderizar Markdown con syntax highlighting usando Shiki
 * Estilo elegante para documentación tipo blog
 */
export function MarkdownContent({ children }: { children: string }) {
  return (
    <div className="markdown-content prose prose-slate dark:prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          // Headings con anchor links
          h1: ({ children, ...props }) => (
            <h1 className="text-4xl font-bold mt-8 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent" {...props}>
              {children}
            </h1>
          ),
          h2: ({ children, ...props }) => (
            <h2 className="text-3xl font-semibold mt-6 mb-3 text-slate-800 dark:text-slate-100" {...props}>
              {children}
            </h2>
          ),
          h3: ({ children, ...props }) => (
            <h3 className="text-2xl font-semibold mt-5 mb-2 text-slate-700 dark:text-slate-200" {...props}>
              {children}
            </h3>
          ),

          // Párrafos
          p: ({ children, ...props }) => (
            <p className="text-base leading-7 text-slate-600 dark:text-slate-300 my-4" {...props}>
              {children}
            </p>
          ),

          // Code blocks con Shiki
          code: ({ className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            const lang = match ? match[1] : '';
            // Detectar inline basándose en la presencia de newlines
            const isInline = !String(children).includes('\n');

            if (!isInline && lang) {
              return <CodeBlock code={String(children).replace(/\n$/, '')} lang={lang} />;
            }

            // Inline code
            return (
              <code
                className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 font-mono text-sm"
                {...props}
              >
                {children}
              </code>
            );
          },

          // Lists
          ul: ({ children, ...props }) => (
            <ul className="list-disc list-inside space-y-2 my-4 text-slate-600 dark:text-slate-300" {...props}>
              {children}
            </ul>
          ),
          ol: ({ children, ...props }) => (
            <ol className="list-decimal list-inside space-y-2 my-4 text-slate-600 dark:text-slate-300" {...props}>
              {children}
            </ol>
          ),
          li: ({ children, ...props }) => (
            <li className="ml-4" {...props}>
              {children}
            </li>
          ),

          // Blockquotes
          blockquote: ({ children, ...props }) => (
            <blockquote
              className="border-l-4 border-blue-500 pl-4 py-2 my-4 bg-blue-50 dark:bg-blue-950/30 italic text-slate-700 dark:text-slate-300"
              {...props}
            >
              {children}
            </blockquote>
          ),

          // Links
          a: ({ children, href, ...props }) => (
            <a
              href={href}
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              target={href?.startsWith('http') ? '_blank' : undefined}
              rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
              {...props}
            >
              {children}
            </a>
          ),

          // Tables
          table: ({ children, ...props }) => (
            <div className="overflow-x-auto my-6">
              <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700" {...props}>
                {children}
              </table>
            </div>
          ),
          thead: ({ children, ...props }) => (
            <thead className="bg-slate-50 dark:bg-slate-800" {...props}>
              {children}
            </thead>
          ),
          tbody: ({ children, ...props }) => (
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-white dark:bg-slate-900" {...props}>
              {children}
            </tbody>
          ),
          th: ({ children, ...props }) => (
            <th className="px-4 py-3 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase tracking-wider" {...props}>
              {children}
            </th>
          ),
          td: ({ children, ...props }) => (
            <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400" {...props}>
              {children}
            </td>
          ),

          // Horizontal rule
          hr: (props) => (
            <hr className="my-8 border-slate-200 dark:border-slate-700" {...props} />
          ),
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}

/**
 * Componente para code blocks con syntax highlighting usando Shiki
 */
function CodeBlock({ code, lang }: { code: string; lang: string }) {
  const [html, setHtml] = useState<string>('');

  useEffect(() => {
    let cancelled = false;

    codeToHtml(code, {
      lang: lang,
      theme: 'github-dark',
    }).then((highlighted) => {
      if (!cancelled) {
        setHtml(highlighted);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [code, lang]);

  if (!html) {
    return (
      <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto">
        <code>{code}</code>
      </pre>
    );
  }

  return (
    <div
      className="my-6 rounded-lg overflow-hidden border border-slate-700"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

/**
 * Componente para callouts/alerts con iconos
 */
export function Callout({
  type = 'info',
  children,
}: {
  type?: 'info' | 'warning' | 'success' | 'error';
  children: React.ReactNode;
}) {
  const styles = {
    info: 'bg-blue-50 dark:bg-blue-950/30 border-blue-500 text-blue-900 dark:text-blue-100',
    warning: 'bg-yellow-50 dark:bg-yellow-950/30 border-yellow-500 text-yellow-900 dark:text-yellow-100',
    success: 'bg-green-50 dark:bg-green-950/30 border-green-500 text-green-900 dark:text-green-100',
    error: 'bg-red-50 dark:bg-red-950/30 border-red-500 text-red-900 dark:text-red-100',
  };

  const icons = {
    info: '💡',
    warning: '⚠️',
    success: '✅',
    error: '❌',
  };

  return (
    <div className={`border-l-4 p-4 my-6 rounded-r-lg ${styles[type]}`}>
      <div className="flex items-start gap-3">
        <span className="text-2xl">{icons[type]}</span>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}

/**
 * Componente para ejemplos de código con preview
 */
export function CodeExample({
  code,
  preview,
  title,
}: {
  code: string;
  preview?: React.ReactNode;
  title?: string;
}) {
  const [showCode, setShowCode] = useState(false);

  return (
    <div className="my-6 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
      {title && (
        <div className="px-4 py-2 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
          <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300">{title}</h4>
        </div>
      )}

      {preview && (
        <div className="p-6 bg-white dark:bg-slate-900">
          {preview}
        </div>
      )}

      <div className="border-t border-slate-200 dark:border-slate-700">
        <button
          onClick={() => setShowCode(!showCode)}
          className="w-full px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-between"
        >
          <span>{showCode ? 'Ocultar' : 'Mostrar'} Código</span>
          <span>{showCode ? '▼' : '▶'}</span>
        </button>

        {showCode && (
          <div className="border-t border-slate-200 dark:border-slate-700">
            <CodeBlock code={code} lang="tsx" />
          </div>
        )}
      </div>
    </div>
  );
}
