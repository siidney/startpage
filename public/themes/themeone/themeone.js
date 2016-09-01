/*
 * The anchor links should point to the corresponding auto generated id for each
 * of the bookmark lists
 */

let modal = document.getElementById('bookmark-modal');
let list;

/*
 * show bookmark list modal display
 */
function modalOpen(e){
    if(e.target.tagName == 'IMG'){
        let idIndex = e.target.parentNode.href.indexOf('#');

        if(idIndex > -1){
            // id of currently selected bookmark list is the index of whatever
            // order it is specified in the lists.js file
            let listID = e.target.parentNode.href.substring(idIndex + 1);
            list = document.getElementById(listID);
            console.log(listID);

            // create close button and add to beginning of bookmark list if does
            // not exist
            if(!document.getElementById(listID + '-btn')){
                let btn = document.createElement('BUTTON');
                btn.onclick = modalClose;
                btn.setAttribute('id', listID + '-btn');
                let t = document.createTextNode('X');
                btn.appendChild(t);
                list.insertBefore(btn, list.childNodes[0]);
            }

            // show modal and corresponding bookmark list
            modal.style.display = 'block';
            list.style.display = 'block';

        }
    }
}
/*
 * close the bookmark list modal display
 */
function modalClose(){
    modal.style.display='none';
    list.style.display='none';
}
/*
 * swap b&w bookmark image for colour version
 */
function colorImage(e){
    if(e.target.tagName == 'IMG'){
        if(e.target.src.indexOf('-alt') == -1){
            e.target.setAttribute('src', e.target.src.slice(0, e.target.src.indexOf('.png')) + '-alt.png');
        }
    }
}
function bwImage(e){
    if(e.target.tagName == 'IMG'){
        if(e.target.src.indexOf('-alt') > -1){
            e.target.setAttribute('src', e.target.src.slice(0, e.target.src.indexOf('-alt')) + '.png');
        }
    }
}
/*
 * event listeners
 */
document.getElementById('bookmark-icons').addEventListener('click', modalOpen, false);
document.getElementById('bookmark-icons').addEventListener('mouseover', colorImage, false);
document.getElementById('bookmark-icons').addEventListener('mouseout', bwImage, false);
