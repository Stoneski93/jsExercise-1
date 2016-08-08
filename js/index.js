class App {
   constructor() {
    this.getItems = this.getItems.bind(this);
    this.getCategories = this.getCategories.bind(this);
    this.initListeners = this.initListeners.bind(this);
    this.setActiveFilter = this.setActiveFilter.bind(this);
    this.renderItems = this.renderItems.bind(this);
    this.grabValues = this.grabValues.bind(this);
    this.clearDesk = this.clearDesk.bind(this);


    this.filter = '#all';
    this.categories = this.getCategories();
    this.items = this.getItems();

  }
  
  getItems() {
    const items = document.querySelectorAll('.item');
    const array = Array.from(items);
    let displayItems = [];

    array.map((object) => {
      displayItems.push(
        {
          titles: object.querySelector('figcaption').textContent.replace(',','').split(' '),
          image: object.querySelector('img').outerHTML
        });
      })
      return displayItems;
  };

  getCategories() {
    const categoriesObjects = document.querySelectorAll('.portfolio__lcolumn__category a');
    const categories = Array.from(categoriesObjects);

    return categories;
  }

  initListeners() {
    this.categories.forEach(
      element => { element.addEventListener('click',
        (e) => this.setActiveFilter(e.target.innerText.split(' ').join('-')) 
      );
    });
  }

  setActiveFilter (val) {
    this.filter = `#${val.toLowerCase()}`;
    this.grabValues(this.items);
  }

  grabValues(items) {
    this.clearDesk();

    if(this.filter === '#all') {
      this.renderItems(this.items);
    } else {
      const filteredItems = items.filter(item => item.titles.indexOf(this.filter)>-1);
      this.renderItems(filteredItems);
    }
  }  
  renderItems (items) {
    let tempo = items.map(({titles, image}) => {
              let template =
              `<li class="item">
                <a href="#">
                  <figure class="img-wrapper">
                    ${(image)}
                    <figcaption>${titles.join(",")} </figcaption>
                    </figure>
                </a>
                </li>`;
                return template;
    })
     
    const view = tempo.join("");
     
    document.querySelector('.portfolio__rcolumn__box').innerHTML += view;

  }

  clearDesk() {
    document.querySelector('.portfolio__rcolumn__box').innerHTML = '';
  }

}
const app = new App();

app.initListeners();
