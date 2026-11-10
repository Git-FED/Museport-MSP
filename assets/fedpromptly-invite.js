class FedPromptlyInvite extends HTMLElement {
  connectedCallback() {
    if (this.shadowRoot) return;
    const root = this.attachShadow({ mode: "open" });
    root.innerHTML = `
      <style>
        :host { display:inline-flex; align-items:center; font-family:Inter,ui-sans-serif,system-ui,sans-serif; }
        * { box-sizing:border-box; }
        .invite-btn { position:relative; isolation:isolate; display:inline-flex; align-items:center; gap:9px; padding:6px 12px 6px 6px; border-radius:12px; text-decoration:none; background:#313338; border:1px solid rgba(255,255,255,.08); box-shadow:0 6px 18px -7px rgba(0,0,0,.7),inset 0 1px 0 rgba(255,255,255,.04); color:#dbdee1; transition:transform .2s,border-color .2s,box-shadow .2s; cursor:pointer; font:inherit; }
        .invite-btn::before { content:"";position:absolute;inset:-2px;z-index:-1;border-radius:14px;background:linear-gradient(120deg,#5865f2,#00b0f4,#eb459e,#5865f2);background-size:300% 300%;filter:blur(12px);opacity:0;transition:opacity .3s;animation:flow 8s linear infinite; }
        @keyframes flow { 0%{background-position:0 50%}50%{background-position:100% 50%}100%{background-position:0 50%} }
        .invite-btn:hover { transform:translateY(-2px);border-color:rgba(88,101,242,.55);box-shadow:0 12px 28px -10px rgba(0,0,0,.85),0 0 0 1px rgba(88,101,242,.25); }
        .invite-btn:hover::before,.invite-btn:focus-visible::before { opacity:.55; }
        .invite-btn:active { transform:translateY(0) scale(.985); }
        .invite-btn:focus-visible,.close:focus-visible,.join:focus-visible { outline:2px solid #5865f2;outline-offset:3px; }
        .icon { position:relative;flex:0 0 34px;width:34px;height:34px;border-radius:50%;background:#fff;box-shadow:0 2px 8px #0006; }
        .icon img { display:block;width:100%;height:100%;border-radius:50%;object-fit:cover;transform:scale(.96); }
        .dot { position:absolute;right:-1px;bottom:-1px;width:11px;height:11px;border-radius:50%;background:#57f287;border:2px solid #313338; }
        .dot::after { content:"";position:absolute;inset:-2px;border:2px solid #57f287;border-radius:50%;animation:ping 2.4s ease-out infinite; }
        @keyframes ping { 0%{transform:scale(.7);opacity:.6}70%,100%{transform:scale(1.7);opacity:0} }
        .label { display:flex;flex-direction:column;gap:2px;line-height:1.15;text-align:left;white-space:nowrap; }
        .name { color:#f2f3f5;font-size:12px;font-weight:700; }
        .meta { color:#949ba4;font-size:9px;font-weight:500; }
        .arrow { display:grid;place-items:center;width:14px;height:14px;color:#949ba4;transition:transform .2s,color .2s; }
        .arrow svg { width:100%;height:100%; }
        .invite-btn:hover .arrow { color:#fff;transform:translateX(3px); }
        .modal { width:min(94vw,520px);max-width:520px;max-height:92dvh;margin:auto;padding:0;border:0;background:transparent;overflow:auto;color:#dbdee1;scrollbar-width:thin; }
        .modal::backdrop { background:rgba(15,16,18,.76);backdrop-filter:blur(6px); }
        .modal[open] { animation:modalIn .22s ease-out; }
        @keyframes modalIn { from{opacity:0;transform:translateY(8px) scale(.98)}to{opacity:1;transform:translateY(0) scale(1)} }
        .panel { position:relative;width:100%; }
        .close { position:absolute;top:12px;right:12px;z-index:20;display:grid;place-items:center;width:32px;height:32px;border-radius:50%;border:1px solid #ffffff24;background:#0008;color:#fff;cursor:pointer;transition:background .18s,transform .18s; }
        .close:hover { background:#000b;transform:scale(1.06); }
        .close svg { width:15px;height:15px; }
        .card { width:100%;background:#313338;border:1px solid #ffffff10;border-radius:14px;overflow:hidden;box-shadow:0 24px 60px -12px #000c,inset 0 1px 0 #ffffff0a;position:relative; }
        .banner { height:128px;position:relative;background:linear-gradient(120deg,#232428 0%,#5865f2 30%,#00b0f4 60%,#eb459e 85%,#232428 100%);background-size:300% 300%;animation:colorFlow 10s ease-in-out infinite;overflow:hidden; }
        .banner::after { content:"";position:absolute;inset:0;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");opacity:.2;mix-blend-mode:overlay;pointer-events:none; }
        @keyframes colorFlow { 0%,100%{background-position:0 50%}50%{background-position:100% 50%} }
        .icon-wrap { position:absolute;left:20px;top:80px;z-index:5;width:88px;height:88px; }
        .server-icon { width:100%;height:100%;border-radius:50%;border:5px solid #313338;background:#fff;display:grid;place-items:center;box-shadow:0 6px 16px #0007;position:relative;overflow:hidden; }
        .server-icon img { width:100%;height:100%;object-fit:cover;transform:scale(.95); }
        .online-dot { position:absolute;right:-2px;bottom:-2px;width:20px;height:20px;border-radius:50%;background:#57f287;border:4px solid #313338;z-index:6; }
        .card-header { padding:52px 20px 18px;background:#313338;position:relative; }
        .server-name { font-size:22px;font-weight:800;letter-spacing:-.025em;color:#f2f3f5;line-height:1.15;margin:0; }
        .stats { display:flex;align-items:center;gap:10px;margin-top:6px;font-size:12px;color:#949ba4;font-weight:500; }
        .stats i { width:3px;height:3px;border-radius:50%;background:#949ba4;display:inline-block;opacity:.6; }
        .stats .tag { color:#dbdee1;font-weight:600; }
        .card-body { padding:0 20px 20px; }
        .description { font-size:12.5px;line-height:1.55;color:#949ba4;border-top:1px solid #ffffff10;padding-top:16px;margin:4px 0 0; }
        .description strong { color:#dbdee1;font-weight:600; }
        .features { display:flex;flex-wrap:wrap;gap:6px;margin-top:14px; }
        .pill { display:inline-flex;align-items:center;gap:6px;padding:6px 10px;border-radius:8px;background:#2b2d31;font-size:11px;font-weight:500;color:#949ba4;line-height:1; }
        .emoji { font-size:13px;line-height:1; }
        .contacts { display:flex;flex-wrap:wrap;align-items:center;gap:8px 14px;margin-top:14px;padding-top:12px;border-top:1px solid #ffffff10;font:10.5px "JetBrains Mono",monospace; }
        .contacts .label { color:#949ba4;text-transform:uppercase;letter-spacing:.14em;font-size:9.5px; }
        .contacts a { color:#dbdee1;text-decoration:none;border-bottom:1px dashed #dbdee138;padding-bottom:1px; }
        .contacts a:hover { color:#fff;border-color:#5865f2; }
        .join { display:flex;align-items:center;justify-content:center;gap:8px;width:100%;padding:13px 16px;margin-top:18px;border-radius:10px;background:#5865f2;color:#fff;font-weight:700;font-size:14px;text-decoration:none;transition:background .18s,transform .18s; }
        .join:hover { background:#4752c4;transform:translateY(-1px); }
        .join svg { width:16px;height:16px; }
        .card-footer { display:flex;align-items:center;justify-content:space-between;padding:12px 20px;background:#232428;border-top:1px solid #ffffff10;font:10.5px "JetBrains Mono",monospace; }
        .domain { color:#dbdee1;font-weight:500;text-decoration:none; }
        .badge { display:inline-flex;align-items:center;gap:5px;color:#949ba4; }
        .badge svg { width:12px;height:12px;stroke:#57f287;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round; }
        @media(max-width:420px) { .meta{font-size:8px}.icon{flex-basis:32px;width:32px;height:32px}.invite-btn{padding:6px 9px 6px 6px;gap:7px}.banner{height:108px}.icon-wrap{left:16px;top:66px}.online-dot{width:18px;height:18px;border-width:3.5px}.card-header{padding:46px 16px 14px}.server-name{font-size:19px}.card-body{padding:0 16px 16px}.card-footer{padding:10px 16px} }
        @media(prefers-reduced-motion:reduce) { .banner,.invite-btn::before,.dot::after,.modal[open]{animation:none!important}.invite-btn,.arrow,.close,.join{transition:none!important} }
      </style>
      <button class="invite-btn" type="button" aria-haspopup="dialog" aria-controls="inviteModal">
        <span class="icon"><img src="https://i.ibb.co/67vXcRnx/icon.png" alt=""><span class="dot" aria-hidden="true"></span></span>
        <span class="label"><span class="name">FedPromptly</span><span class="meta">Open source · AI tools · Publishing</span></span>
        <span class="arrow" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg></span>
      </button>
      <dialog class="modal" id="inviteModal" aria-label="FedPromptly social invite">
        <div class="panel"><button class="close" type="button" aria-label="Close invite"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
          <article class="card" aria-label="FedPromptly social invite"><div class="banner"></div><div class="icon-wrap"><div class="server-icon"><img src="https://i.ibb.co/67vXcRnx/icon.png" alt="FedPromptly logo"></div><div class="online-dot" title="Community invite"></div></div>
            <header class="card-header"><h2 class="server-name">FedPromptly</h2><div class="stats"><span class="tag">Open source</span><i></i><span>AI tools</span><i></i><span>Publishing</span></div></header>
            <div class="card-body"><p class="description">Building an open-source ecosystem for <strong>browser-native AI tools</strong> and <strong>cross-platform publishing</strong>.</p><div class="features"><span class="pill"><span class="emoji">🔓</span> Open source</span><span class="pill"><span class="emoji">🌐</span> Browser-native</span><span class="pill"><span class="emoji">🤖</span> AI tools</span><span class="pill"><span class="emoji">📡</span> Cross-platform</span></div>
              <div class="contacts"><span class="label">Contact</span><a href="mailto:contact@fedpromptly.com">contact@fedpromptly.com</a><a href="mailto:careers@fedpromptly.com">careers@fedpromptly.com</a></div>
              <a class="join" href="https://www.fedpromptly.com/social" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>Join the community</a>
            </div><footer class="card-footer"><a class="domain" href="https://www.fedpromptly.com" target="_blank" rel="noopener noreferrer">www.fedpromptly.com</a><span class="badge"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18-6-6 6-6"/><path d="m15 6 6 6-6 6"/></svg>Open source</span></footer>
          </article>
        </div>
      </dialog>`;
    const modal = root.getElementById("inviteModal");
    root.querySelector(".invite-btn").addEventListener("click", () => modal.showModal());
    root.querySelector(".close").addEventListener("click", () => modal.close());
    modal.addEventListener("click", (event) => {
      if (event.target === modal) modal.close();
    });
  }
}

if (!customElements.get("fedpromptly-invite")) {
  customElements.define("fedpromptly-invite", FedPromptlyInvite);
}
