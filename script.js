function arrChecker(nameOfClass, nameOfTag, where){
    let area = (document.querySelector(where))?document.querySelector(where):'missing';
    if(area!= 'missing'){
        let tag = area.querySelectorAll(`${nameOfTag}`);
       
        if(tag.length!=0){
            let arr = [];
            Array.from(tag).forEach(function cb(ele,index){
                if(ele.classList.contains(nameOfClass)){
                   arr.push(ele);
                }
            });
            return arr;

        }else{
            console.log(`0 ${nameOfTag} found in ${where}`);
            return false;
        }
    }
}
function remover(element, classToRemove){
    Array.from(document.querySelectorAll(element)).forEach((removeEle)=>{
        removeEle.classList.remove(classToRemove);
        
        console.log(classToRemove);
    })
}
if(document.querySelector('.single_multi')){
    let main = document.querySelector('.single_multi');
    let header = (document.querySelector('header'))? document.querySelector('header'):'missing';
    let pageLinks = (header.querySelectorAll('.pageLink').length != 0)? arrChecker('pageLink','a','header'):'missing';
    let direct_child = (main.children)? main.children: 'missing';
    
    
    
    if(direct_child != 'missing'){
        Array.from(direct_child).forEach(function cb(e,index){
            if(e.tagName === 'SECTION')
            {
                e.id = index;
                e.style.width = '100vw' ;
                e.style.height = '100vh' ;
                e.style.position = 'absolute';
            }else{
                console.log('Must have section element as direct element of main tag !!');
            }
        })
    }else{
        console.log('something is wrong with your main please check the implementation');
    }
    if(pageLinks != "missing"){
        if(pageLinks.length === direct_child.length){
            header.addEventListener('click',function cb(e){
                e.preventDefault();
                if(e.target.tagName === 'A' && e.target.classList.contains('pageLink'))
                {
                    Array.from(e.target.classList).forEach((linkele)=>{
                        if(parseInt(linkele)){
                            if(Array.from(direct_child).length != 0 || direct_child === 'missing'){
                                Array.from(direct_child).forEach(function cb(secele,index){
                                    if(secele.tagName === 'SECTION')
                                    {   remover('section','.display');
                                        if(linkele === secele.id){
                                            secele.classList.add('display');
                                        }
                                    }
                                })
                            }
                            return;
                        }
                    })
                }
            })
        }else{
            console.log('pages and link of the page count are different');
        }
    }else{
        console.log('Header does not have any anchor tag with specified class');
    }
   
}else{
    console.log(`!!! "single_multi" this class must added to the main element `)
}