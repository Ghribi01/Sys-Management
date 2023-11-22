const title=document.querySelector('#title')
const price=document.querySelector('#price')
const taxes=document.querySelector('#taxes')
const ads=document.querySelector('#ads')
const discount=document.querySelector('#discount')
const total=document.querySelector('#total')
const count=document.querySelector('#count')
const category=document.querySelector('#category')
const createBtn=document.querySelector('#create-btn')
const inputs=document.querySelectorAll('input')
const table=document.querySelector('#item-table')
const LOCAL_STORAGE_PREFIX='CRUDS App'
const LOCAL_STORAGE_KEY=`${LOCAL_STORAGE_PREFIX}-products`
let products=loadProducts()
const delAll=document.querySelector('#delete-all')
const searchCat=document.querySelector('#search-category')
const searchT=document.querySelector('#search-title')
const inputSearch=document.querySelector('#search-bar')
const upBtn=document.querySelector('.upBtn')
const updateBtn=document.querySelector('#update-btn')
const calc=document.querySelector('.calc')
//identifier
function identifier(){
    const currentDate=new Date()
    const uniqueID=currentDate.getTime()
    return uniqueID
}
//Create Function
createBtn.addEventListener('click',e=>{
    if(title.value==="" || price.value==="" || taxes.value==="" || ads.value==="" || discount.value==="" || count.value==="" || category.value==="") return 
    product={
        id:identifier(),
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        count:count.value,
        category:category.value
      }
  products.push(product)
  renderProduct(product)
  inputs.forEach(input=>{
     input.value=""
  })
  saveProducts()
})
function saveProducts(){
localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(products))
}
function renderProduct(product){
    const template=document.querySelector('.template')
    const templateContent=template.content.cloneNode(true)
    const id=templateContent.querySelector('.id')
    const titre=templateContent.querySelector('.titre')
    const prix=templateContent.querySelector('.prix')
    const taxe=templateContent.querySelector('.taxe')
    const ad=templateContent.querySelector('.ad')
    const dis=templateContent.querySelector('.dis')
    const cnt=templateContent.querySelector('.cnt')
    const cat=templateContent.querySelector('.cat')
    id.innerText=product.id
    titre.innerText=product.title
    prix.innerText=product.price+'$'
    taxe.innerText=product.taxes+'$'
    ad.innerText=product.ads+'$'
    dis.innerText=product.discount+'%'
    cnt.innerText=product.count
    //tot.innerText=   
    cat.innerText=product.category
    table.appendChild(templateContent)
}
function loadProducts(){
 const toString=localStorage.getItem(LOCAL_STORAGE_KEY) || '[]'
 return JSON.parse(toString)
}
//load products
    products.forEach(element=>{
      renderProduct(element)
    })
//Delete 
document.addEventListener('click',e=>{
    if(!e.target.matches('.delBtn')) return
    const tr=e.target.closest('tr')
    const tit=tr.querySelector('.titre')
    products=products.filter(element=>element.title!=tit.innerText)
    saveProducts()
    table.removeChild(tr)

})
delAll.addEventListener('click',function(){
    localStorage.removeItem(LOCAL_STORAGE_KEY)
    table.forEach(element=>{
        table.removeChild(element)
    })
})
//Searching By Category
function search(){
const rows=table.querySelectorAll('tr')
const cate=inputSearch.value
if(cate==="") return
rows.forEach(row=>{
let categorycell=row.querySelector('.cat')
if(categorycell){
const categoryText=categorycell.innerText
if(categoryText!=cate){
    table.removeChild(row)
}
}
})
}
searchCat.addEventListener('click',e=>{
    e.preventDefault()
    search()
})
//SEARCHING By Title
function searchTitle(){
    const tit=inputSearch.value
    if(tit==="") return
    const rows=table.querySelectorAll('tr')
    rows.forEach(row=>{
    let titlecell=row.querySelector('.titre')
    if(titlecell){
    const titleText=titlecell.innerText
    if(titleText!=tit){
        table.removeChild(row)
    }
    }
    })
}
searchT.addEventListener('click',e=>{
    e.preventDefault()
    searchTitle()
})
document.addEventListener('click',e=>{
   if(!e.target.matches('.upBtn')) return 
   const tr=e.target.closest('tr')
   const id=tr.querySelector('.id')
   const title=tr.querySelector('.titre')
   const price=tr.querySelector('.prix')
   const taxe=tr.querySelector('.taxe')
   const ads=tr.querySelector('.ad')
   const cnt=tr.querySelector('.cnt')
   const cat=tr.querySelector('.cat')
   createBtn.innerText='Update';
   createBtn.style.background="green"
})
// calcule Total
function calTotal(){
if(!price.value |!taxes.value |!ads.value |isNaN(price.value) |isNaN(taxes.value) |isNaN(ads.value)|false){
    total.vaue="Total:"
    total.classList.remove("right")
    return
}
total.value=0
if(parseInt(discount.value)>0) total.value=parseInt(total.value)-parseInt(discount.value)

total.value=parseInt(total.value)+parseInt(price.value)+parseInt(taxes.value)+parseInt(ads.value)
total.classList.add('right')
total.value='Total:'+total.value
}
calc.addEventListener('change',e=>{
    calTotal()
})
