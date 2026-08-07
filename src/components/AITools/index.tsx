import React, { useState } from 'react';
import styles from './styles.module.css';

// Derive the mirror URL for the current page.
// /help/docs/foo/bar → /help/llm/docs/foo/bar.md
function getMirrorUrl(): string | null {
  if (typeof window === 'undefined') return null;
  const match = window.location.pathname.match(/^(.*\/docs\/.+?)\/?$/);
  if (!match) return null;
  return `${window.location.origin}${match[1].replace('/docs/', '/llm/docs/')}.md`;
}

async function getPageContent(): Promise<string> {
  const mirrorUrl = getMirrorUrl();
  if (mirrorUrl) {
    try {
      const res = await fetch(mirrorUrl);
      if (res.ok) return await res.text();
    } catch { /* fall through */ }
  }

  // Fall back to readable page text when the markdown mirror is unavailable.
  const el = document.querySelector('article') || document.body;
  return (el as HTMLElement).innerText.replace(/\s+/g, ' ').trim().slice(0, 4000);
}

function getPrompt(): string {
  const url = typeof window !== 'undefined' ? window.location.href : '';
  const mirrorUrl = getMirrorUrl();
  const source = mirrorUrl ? `the markdown mirror at ${mirrorUrl} and the source page at ${url}` : `the source page at ${url}`;
  return encodeURIComponent(`Read ${source} so I can ask questions about its contents. If you cannot access the page, ask me to paste the copied page content.`);
}

function CopyIcon() {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function ClaudeIcon() {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z" />
    </svg>
  );
}

function ChatGPTIcon() {
  return (
    <svg className={styles.icon} viewBox="0 0 500 500" fill="currentColor" aria-hidden="true">
      <path d="m230.36 64.454c-40.644 0-76.751 26.13-89.335 64.721l-0.0273 0.17148a93.149 93.149 0 0 0-61.504 44.891c-20.321 35.198-15.746 79.533 11.383 109.73l0.13281 0.10976a93.149 93.149 0 0 0 8.125 75.71c20.322 35.199 61.005 53.403 100.72 45.005l0.16172-0.0598a93.149 93.149 0 0 0 69.629 30.817c40.644 0 76.751-26.13 89.335-64.721l0.0274-0.17148a93.149 93.149 0 0 0 61.504-44.889c20.322-35.199 15.746-79.534-11.383-109.73l-0.11758-0.0984a93.149 93.149 0 0 0-8.1389-75.722c-20.322-35.199-61.005-53.403-100.72-45.005l-0.16211 0.05976a93.149 93.149 0 0 0-69.629-30.817zm0 24.117v2e-3l-0.12343 0.12344c16.285 0 31.934 5.6011 44.488 15.957l-75.863 43.8c-0.96785 0.55879-1.8325 1.2311-2.5888 1.9913-2.3238 2.2495-3.6625 5.3931-3.6625 8.763v100.03l-31.662-18.249-0.0156-82.636c-0.0117-7.9968 1.3884-15.895 4.0519-23.371l-0.21992-0.0539c9.5679-26.968 35.302-46.306 65.592-46.354zm90.794 28.93c23.493 0.52062 46.171 12.933 58.828 34.775l-2e-3 2e-3 -0.16757-0.0461c8.1425 14.103 11.117 30.458 8.4258 46.508l-75.865-43.8c-0.96519-0.55726-1.9756-0.97039-3.0091-1.2453-3.1128-0.89156-6.5084-0.47812-9.4301 1.2086l-86.627 50.013-0.0273-36.542 71.558-41.331c6.9206-4.007 14.46-6.746 22.266-8.1771l-0.0637-0.21797c4.6882-0.86613 9.4157-1.251 14.112-1.147zm-184.67 38.412v87.6c0 1.12 0.14844 2.2072 0.42989 3.2443 0.78714 3.1352 2.8409 5.8626 5.7579 7.5468l86.627 50.015-31.635 18.295-71.572-41.308c-6.9305-3.9898-13.072-9.1492-18.214-15.194l-0.15625 0.16367c-18.572-21.77-22.452-53.725-7.3482-79.982h2e-3l0.0442 0.16953c8.1424-14.103 20.818-24.857 36.064-30.551zm165.84 21.472 71.572 41.308c6.9305 3.9898 13.072 9.1492 18.214 15.194l0.15625-0.16367c18.572 21.77 22.452 53.725 7.3482 79.982h-2e-3l-0.0445-0.16953c-8.1424 14.103-20.818 24.857-36.064 30.551v-87.6c0-1.12-0.14844-2.2072-0.42989-3.2443-0.78711-3.1352-2.8409-5.8626-5.7579-7.5468l-86.627-50.015zm-52.332 30.166 36.76 21.223v42.451l-36.76 21.223-36.76-21.225v-42.449zm57.39 33.213 31.662 18.249 0.0117 82.636c0.0117 7.9969-1.3884 15.895-4.052 23.371l0.21992 0.0539c-9.5677 26.968-35.301 46.306-65.592 46.354v-2e-3l0.12344-0.12344c-16.285 0-31.934-5.6011-44.488-15.957l75.864-43.8c0.96785-0.55879 1.8325-1.2311 2.5889-1.9912 2.3238-2.2495 3.6625-5.3932 3.6625-8.7631zm-20.697 54.319 0.0273 36.542-71.558 41.331c-6.9206 4.007-14.46 6.746-22.266 8.1771l0.0637 0.21797c-28.14 5.1986-57.753-7.4193-72.941-33.628l2e-3 -2e-3 0.16758 0.0461c-8.1425-14.103-11.117-30.458-8.4258-46.508l75.865 43.8c0.96519 0.55723 1.9756 0.97032 3.0091 1.2452 3.1128 0.89156 6.5084 0.4782 9.4301-1.2086z" />
    </svg>
  );
}

export default function AITools(): JSX.Element {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      const text = await getPageContent();
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* clipboard not available */ }
  };

  return (
    <div className={styles.aiTools}>
      <div className={styles.header}>Use with AI</div>
      <button className={styles.action} onClick={handleCopy}>
        <CopyIcon />
        {copied ? 'Copied!' : 'Copy page content'}
      </button>
      <a className={styles.action} href={`https://claude.ai/new?q=${getPrompt()}`} target="_blank" rel="noopener noreferrer">
        <ClaudeIcon />
        Ask Claude
      </a>
      <a className={styles.action} href={`https://chatgpt.com/?q=${getPrompt()}`} target="_blank" rel="noopener noreferrer">
        <ChatGPTIcon />
        Ask ChatGPT
      </a>
    </div>
  );
}
