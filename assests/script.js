document.addEventListener('DOMContentLoaded', (event) => {
    initiate();
});

let timeout;
let timeout2;
const anim_duration = 300;
const classes = {
    hide_display: 'no-display',
    active: 'active',
    fadeout: 'fadeout',
    fadein: 'fadein',
    detailView: 'detail-view',
    shrink: 'shrink',
    expand: 'expand'
}
const queries = {
    sidebar: {
        home: '#nav-home',
        about: '#nav-about',
        resume: '#nav-resume',
        portfolio: '#nav-portfolio',
        active: '.nav-link.active'
    },
    content: {
        home: '#content-home',
        about: '#content-about',
        resume: '#content-resume',
        portfolio: '#content-portfolio',
        active: '#content .active'
    },
    projects: {
        project: '.projects .project',
        preview: '.preview',
        closeBtn: '.details .close',
        details: '.details',
    }
}

const initiate = () => {
    setSidebar();
    setPortfolioDetails();
    // setCanvas();
}

const setSidebar = () => {
    const side_home = document.querySelector(queries.sidebar.home);
    const side_about = document.querySelector(queries.sidebar.about);
    const side_resume = document.querySelector(queries.sidebar.resume);
    const side_portfolio = document.querySelector(queries.sidebar.portfolio);
    const content_home = document.querySelector(queries.content.home);
    const content_about = document.querySelector(queries.content.about);
    const content_resume = document.querySelector(queries.content.resume);
    const content_portfolio = document.querySelector(queries.content.portfolio);
    
    const navigation = [
        {
            side: side_home,
            content: content_home
        },
        {
            side: side_about,
            content: content_about
        },
        {
            side: side_resume,
            content: content_resume
        },
        {
            side: side_portfolio,
            content: content_portfolio
        },
    ];

    setNavigation(navigation);
}

const setNavigation = nav => {
    for (const item of nav){
        item.side.onclick = () => {
            if (timeout) return;
            const activeLink = document.querySelector(queries.sidebar.active);
            if (activeLink === item.side) return;
            activeLink.classList.remove(classes.active);
            item.side.classList.add(classes.active);

            clearTimeout(timeout);

            const activeContent = document.querySelector(queries.content.active);
            item.content.classList.add(classes.active);
            activeContent.classList.remove(classes.active);
            activeContent.classList.remove(classes.fadein);
            activeContent.classList.add(classes.fadeout);
            
            timeout = setTimeout(() => {
                item.content.classList.remove(classes.hide_display);
                item.content.classList.add(classes.fadein);
                activeContent.classList.add(classes.hide_display);
                activeContent.classList.remove(classes.fadeout);
                clearTimeout(timeout);
                timeout = null;
            }, anim_duration);
        }
    }
}

const setPortfolioDetails = () => {
    const projects = document.querySelectorAll(queries.projects.project);

    for (const project of projects) {
        const preview = project.querySelector(queries.projects.preview);
        const details = project.querySelector(queries.projects.details);

        const viewBtn = project.querySelector('.btn.view-detail');
        viewBtn.onclick = e => {
            const oldDetails = document.querySelector('.container .details.active');
            
            let delay = 0;
            if (oldDetails) {
                delay = 200;
                oldDetails.classList.remove('animate');
                setTimeout(() => {
                    oldDetails.remove();
                }, delay)
            }

            const clone = details.cloneNode(true);
            clone.classList.add('clone');

            const cloneContainer = document.createElement('div');
            cloneContainer.setAttribute('class', 'detailContainer');
            cloneContainer.appendChild(clone);

            
            setTimeout(() => {
                // project.parentNode.insertBefore(cloneContainer, project.nextSibling);
                project.parentNode.appendChild(cloneContainer);
                clone.classList.add('active');
                setTimeout(() => {
                    clone.classList.add('animate');
                    window.scrollTo(0, clone.offsetTop - 400);
                }, 50)
            }, 300);
            const closeBtn = clone.querySelector(queries.projects.closeBtn);

            closeBtn.onclick = function(e) {
                clone.classList.remove('animate');
                setTimeout(() => {
                    this.parentNode.remove();
                }, 300);
            }
        }
    }
}

class Star {
    constructor(x, y, r, color, timeout) {
        this.x = x;
        this.y = y;
        this.initial_radius = r;
        this.radius = r;
        this.initial_color = color;
        this.color = color;
        this.canvas = document.querySelector('#stars');
        this.context = this.canvas.getContext("2d");
        this.time = 0;
        this.timeout = timeout;
    }
    render(){
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        this.context.shadowBlur = 50; 
        this.context.shadowColor = "white";
        this.context.fillStyle = this.color;
        this.context.fill();
    }
    update(){
        if (this.time === this.timeout) {
            this.radius += 1;
            this.time = 0;
            this.render();
        } else {
            // this.color = this.initial_color;
            this.time += 1;
            this.radius = this.initial_radius;
            this.render();
        }
    }
    getTime = () => this.time;
}

const setCanvas = () => {
    width = 1920;
    height = 1080;
    const canvas = document.querySelector('#stars');

    const context = canvas.getContext("2d");
    canvas.width = '1980'
    canvas.height = '1080'

    const stars = [];
    for(i = 0; i < 500; i++){
        const randomX = Math.floor((Math.random() * width) + 1);
        const randomY = Math.floor((Math.random() * height) + 1);
        const randomR = Math.random() * 2 + .5;
        const timeout = Math.floor(Math.random() * 10) + 5;
        console.log(timeout)


        const star = new Star(randomX, randomY, randomR / 2, '#F1F1F1', timeout);
        stars.push(star);
    }



    // context.clearRect(0,0,C_WIDTH,C_HEIGHT);
    for(let i = 0; i < stars.length; i++){
        stars[i].render();
    }

    setInterval(() => {
        context.clearRect(0, 0, width, height)
        for (let i = 0; i < 10; i++) {
            stars[i].update();
        }
        for (let i = 10; i < 500; i++) {
            stars[i].render();
        }
        // for(const item of stars) {
        //     item.update();
        // }
    }, 1000);

    // context.beginPath();
    // context.arc(width / 2, height / 2, 100, 0, 2 * Math.PI);
    // context.strokeStyle = 'white';
    // context.fillStyle = 'white'
    // context.fill();
    // context.stroke();
    
    // ctx.beginPath();
    // ctx.arc(width / 2, height / 2, center_circle_radius, 0, 2 * Math.PI);
    // ctx.fillStyle = 'red';
    // ctx.fill();
}