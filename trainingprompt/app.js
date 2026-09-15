const texts=[...document.querySelectorAll('[data-zh]')];
texts.forEach(el=>el.dataset.en=el.innerHTML);
let lang='en', mode='image';
const control=document.querySelector('#language');
function renderCue(){
 const zh=lang==='zh-CN';
 const cues={image:`<img src="assets/jumping-jack.webp" width="290" height="290" alt="${zh?'开合跳动作提示':'Jumping jack movement cue'}"><strong>${zh?'开合跳':'Jumping jack'}</strong>`,color:`<span class="color-disc" aria-hidden="true"></span><strong>${zh?'橙色 · 由你定义动作':'Orange · You choose the action'}</strong>`,word:`<span class="big-cue">LEFT</span><strong>${zh?'向左 · 一个清晰的方向':'One clear direction'}</strong>`,emoji:`<span class="emoji-cue" role="img" aria-label="${zh?'开心的表情':'Happy expression'}">😄</span><strong>${zh?'模仿这个表情':'Match this expression'}</strong>`};
 document.querySelector('#cue-content').innerHTML=cues[mode];
 document.querySelector('.stage-bottom>span:last-child').textContent=['image','color','word','emoji'].map(x=>x===mode?'●':'○').join(' ');
}
function setLanguage(next){lang=next;document.documentElement.lang=lang;texts.forEach(el=>el.innerHTML=el.dataset[lang==='en'?'en':'zh']);control.textContent=lang==='en'?'中文':'EN';control.setAttribute('aria-label',lang==='en'?'切换为中文':'Switch to English');renderCue();}
control.addEventListener('click',()=>setLanguage(lang==='en'?'zh-CN':'en'));
document.querySelectorAll('[data-mode]').forEach(button=>button.addEventListener('click',()=>{mode=button.dataset.mode;document.querySelectorAll('[data-mode]').forEach(el=>{el.classList.toggle('active',el===button);el.setAttribute('aria-pressed',String(el===button));});renderCue();}));
if(navigator.language.toLowerCase().startsWith('zh'))setLanguage('zh-CN');
