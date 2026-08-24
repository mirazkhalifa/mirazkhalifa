const defaultData={
 name:"Md. Miraz Khalifa",
 role:"Business Development Manager",
 heroIntro:"Helping businesses choose practical digital solutions that improve efficiency, visibility and customer experience.",
 heroImage:"assets/miraz-1.jpeg",
 aboutImage:"assets/miraz-2.jpeg",
 aboutText:"I am a Business Development Manager at INovex Idea Solution Limited, focused on building strong client relationships, understanding business needs and connecting organizations with practical technology solutions. Previously, I worked at Swosti Limited as a Customer Relationship Manager. My work combines client communication, solution presentation, relationship management and business growth.",
 stat1:"Business",stat2:"Digital",stat3:"Client",
 phone:"01575395282",
 email:"mirazkhalifa.cou@gmail.com",
 address:"Level-9, Venus Complex, Progoti Soroni, Merul Badda, Dhaka",
 experiences:[
  {company:"INovex Idea Solution Limited",role:"Business Development Manager",period:"Present",desc:"Business development, client relationship management, solution presentation, proposal preparation and technology solution sales."},
  {company:"Swosti Limited",role:"Customer Relationship Manager",period:"Previous Experience",desc:"Managed customer relationships, understood client requirements, coordinated support and helped maintain long-term customer satisfaction."}
 ],
 products:[
  {name:"MDM (Mobile Device Management)",desc:"Centralized management and security of enterprise mobile devices, including device enrollment, policy control, application management, monitoring and lifecycle operations."},
  {name:"Inventory Management",desc:"A structured solution for tracking products, stock movement, availability and operational inventory information from a centralized system."},
  {name:"PayProtect",desc:"A digital payment protection solution designed to support secure payment-related operations and device-based business workflows."},
  {name:"Mobile Locker",desc:"A device control solution for financed or managed smartphones, supporting remote lock/unlock, payment reminders and protection against misuse or unauthorized reset."},
  {name:"Digital Signage",desc:"Manage and publish digital content to connected screens for advertisements, announcements, information displays and business communication."},
  {name:"Lumocast",desc:"A digital communication and content broadcasting solution for distributing managed content across connected display or media environments."},
  {name:"VTS (Vehicle Tracking System)",desc:"Vehicle tracking and monitoring solution for visibility into vehicle location, movement and operational activities."},
  {name:"Q-Management",desc:"Queue management solution that helps organizations organize customer flow, reduce waiting confusion and improve service experience."},
  {name:"Website Development",desc:"Professional, responsive websites and customized web solutions designed around a company's branding, business process and customer needs."}
 ],
 blogs:[]
};

const STORAGE_KEY="mirazPortfolioData_v3";
let data=loadData();
function loadData(){
  try{
    const saved=localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : structuredClone(defaultData);
  }catch(e){ return structuredClone(defaultData); }
}
function saveStore(){localStorage.setItem(STORAGE_KEY,JSON.stringify(data))}
function $(id){return document.getElementById(id)}
function render(){
 $("brandName").textContent=data.name;$("heroTitle").textContent=data.name;$("heroRole").textContent=data.role;$("heroIntro").textContent=data.heroIntro;
 $("heroImage").src=data.heroImage;$("aboutImage").src=data.aboutImage;$("aboutText").textContent=data.aboutText;
 $("stat1").textContent=data.stat1;$("stat2").textContent=data.stat2;$("stat3").textContent=data.stat3;
 $("contactTitle").textContent=data.name;$("contactRole").innerHTML=data.role+"<br>INovex Idea Solution Limited";
 $("phoneLink").textContent=data.phone;$("phoneLink").href="tel:"+data.phone.replace(/\s/g,"");
 $("emailLink").textContent=data.email;$("emailLink").href="mailto:"+data.email;$("addressText").textContent=data.address;$("footerName").textContent=data.name;$("year").textContent=new Date().getFullYear();
 $("experienceList").innerHTML=data.experiences.map(x=>`<article class="experience"><h3>${esc(x.role)}</h3><div class="meta">${esc(x.company)} • ${esc(x.period)}</div><p>${esc(x.desc)}</p></article>`).join("");
 $("productsGrid").innerHTML=data.products.map((x,i)=>`<article class="product" onclick="openProduct(${i})"><div class="product-icon">◈</div><h3>${esc(x.name)}</h3><p>${esc(x.desc)}</p><span class="primary">View details →</span></article>`).join("");
 $("blogGrid").innerHTML=data.blogs.length?data.blogs.map(b=>`<article class="blog-card">${b.image?`<img src="${b.image}" alt="">`:""}<div class="inner"><small>${esc(b.category||"Insights")}</small><h3>${esc(b.title)}</h3><p>${esc(b.body).slice(0,180)}${b.body.length>180?"…":""}</p><div class="actions"><button class="primary" onclick="readBlog('${b.id}')">Read</button><button class="secondary" onclick="editBlog('${b.id}')">Edit</button><button class="danger" onclick="deleteBlog('${b.id}')">Delete</button></div></div></article>`).join(""):`<div class="blog-card"><div class="inner"><h3>No posts yet</h3><p>Click “Write a Blog” to publish your first article.</p></div></div>`;
}
function esc(s=""){return s.replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function openProduct(i){$("modalProductTitle").textContent=data.products[i].name;$("modalProductDesc").textContent=data.products[i].desc;$("modalProductImage").style.display="none";$("productModal").classList.add("show")}
function readBlog(id){const b=data.blogs.find(x=>x.id===id);if(!b)return;alert(b.title+"\n\n"+b.body)}
function closeModal(id){$(id).classList.remove("show")}

function showTab(id){document.querySelectorAll(".tab").forEach(x=>x.classList.remove("active"));$(id).classList.add("active")}
function fileToData(input,cb){const f=input.files[0];if(!f)return;const r=new FileReader();r.onload=()=>cb(r.result);r.readAsDataURL(f)}
function renderExperienceEditor(){ $("expEditorList").innerHTML=data.experiences.map((x,i)=>`<div class="editor-item"><div class="row"><label>Company<input value="${esc(x.company)}" onchange="data.experiences[${i}].company=this.value"></label><label>Role<input value="${esc(x.role)}" onchange="data.experiences[${i}].role=this.value"></label></div><div class="row"><label>Period<input value="${esc(x.period)}" onchange="data.experiences[${i}].period=this.value"></label><label>Description<input value="${esc(x.desc)}" onchange="data.experiences[${i}].desc=this.value"></label></div><button class="danger" onclick="data.experiences.splice(${i},1);renderExperienceEditor()">Delete</button></div>`).join("")}
function renderProductEditor(){ $("prodEditorList").innerHTML=data.products.map((x,i)=>`<div class="editor-item"><label>Product name<input value="${esc(x.name)}" onchange="data.products[${i}].name=this.value"></label><label>Description<textarea onchange="data.products[${i}].desc=this.value">${esc(x.desc)}</textarea></label><button class="danger" onclick="data.products.splice(${i},1);renderProductEditor()">Delete</button></div>`).join("")}
function addExperience(){data.experiences.push({company:"New Company",role:"New Position",period:"Year",desc:"Add your experience description."});renderExperienceEditor()}
function addProduct(){data.products.push({name:"New Product",desc:"Add product description."});renderProductEditor()}
function saveAll(){
 data.name=$("eName").value.trim()||data.name;
 data.role=$("eRole").value.trim()||data.role;
 data.heroIntro=$("eHeroIntro").value;
 data.aboutText=$("eAboutText").value;
 data.stat1=$("eStat1").value;
 data.stat2=$("eStat2").value;
 data.stat3=$("eStat3").value;
 data.phone=$("ePhone").value.trim();
 data.email=$("eEmail").value.trim();
 data.address=$("eAddress").value;
 data.name=$("eContactTitle").value.trim()||data.name;
 let pending=0;
 const done=()=>{pending--;if(pending<=0)finishSave()};
 const hero=$("eHeroImage"),about=$("eAboutImage");
 if(hero.files.length){pending++;fileToData(hero,r=>{data.heroImage=r;done()})}
 if(about.files.length){pending++;fileToData(about,r=>{data.aboutImage=r;done()})}
 if(pending===0)finishSave();
}
let savePending=0;
function finishSave(){savePending++;clearTimeout(window.saveTimer);window.saveTimer=setTimeout(()=>{saveStore();render();closeModal("editorModal");savePending=0},250)}
function resetData(){if(confirm("Reset all website content to demo data?")){data=structuredClone(defaultData);saveStore();render();openEditor()}}
function openBlogEditor(id=""){
 $("blogEditId").value=id;$("blogTitle").value="";$("blogCategory").value="";$("blogBody").value="";$("blogImage").value="";
 if(id){const b=data.blogs.find(x=>x.id===id);$("blogTitle").value=b.title;$("blogCategory").value=b.category;$("blogBody").value=b.body;$("blogEditorHeading").textContent="Edit Blog"}else $("blogEditorHeading").textContent="Write a Blog";
 $("blogEditorModal").classList.add("show")
}
function editBlog(id){openBlogEditor(id)}
function publishBlog(){
 const title=$("blogTitle").value.trim(),body=$("blogBody").value.trim();if(!title||!body){alert("Please enter a title and article.");return}
 const id=$("blogEditId").value||Date.now().toString(),old=data.blogs.find(x=>x.id===id);const item={id,title,body,category:$("blogCategory").value.trim()||"Insights",image:old?old.image:"",date:new Date().toLocaleDateString()};
 const file=$("blogImage").files[0];if(file){const r=new FileReader();r.onload=()=>{item.image=r.result;finishBlog(item)};r.readAsDataURL(file)}else finishBlog(item)
}
function finishBlog(item){const i=data.blogs.findIndex(x=>x.id===item.id);if(i>=0)data.blogs[i]=item;else data.blogs.unshift(item);saveStore();render();closeModal("blogEditorModal")}
function deleteBlog(id){if(confirm("Delete this blog post?")){data.blogs=data.blogs.filter(x=>x.id!==id);saveStore();render()}}
$("eHeroImage").addEventListener("change",()=>{});$("eAboutImage").addEventListener("change",()=>{});
render();


/* ALL FIELDS EDITABLE PATCH */
(function(){
  const originalOpenEditor = window.openEditor;
  

  const oldSaveAll = window.saveAll;
  window.saveAll = function(){
    const eph=document.getElementById("eProductsHeading");
    const epl=document.getElementById("eProductsLead");
    const ech=document.getElementById("eContactHeading");
    const ect=document.getElementById("eContactTitle2");
    const ecr=document.getElementById("eContactRole");
    if(eph) localStorage.setItem("miraz_products_heading", eph.value);
    if(epl) localStorage.setItem("miraz_products_lead", epl.value);
    if(ech) localStorage.setItem("miraz_contact_heading", ech.value);
    if(ect) localStorage.setItem("miraz_contact_title", ect.value);
    if(ecr) localStorage.setItem("miraz_contact_role", ecr.value);
    if(typeof oldSaveAll==="function") oldSaveAll();
    setTimeout(applySectionEdits,300);
  };

  window.applySectionEdits=function(){
    const ph=document.getElementById("productsHeading");
    const pl=document.getElementById("productsLead");
    const ch=document.getElementById("contactHeading");
    const ct=document.getElementById("contactTitle");
    const cr=document.getElementById("contactRole");
    if(ph) ph.textContent=localStorage.getItem("miraz_products_heading") || "Products & Solutions";
    if(pl) pl.textContent=localStorage.getItem("miraz_products_lead") || "Digital products and services I work with to solve real business needs.";
    if(ch) ch.textContent=localStorage.getItem("miraz_contact_heading") || "Let's Connect";
    if(ct && localStorage.getItem("miraz_contact_title")) ct.textContent=localStorage.getItem("miraz_contact_title");
    if(cr && localStorage.getItem("miraz_contact_role")) cr.innerHTML=localStorage.getItem("miraz_contact_role").replace(/\n/g,"<br>");
  };
  document.addEventListener("DOMContentLoaded",applySectionEdits);
})();

/* Inline Edit buttons for individual public fields */
,100);
}
