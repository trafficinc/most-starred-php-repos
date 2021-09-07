// --@ts-nocheck

import axios from 'axios';

interface Element extends Node, ARIAMixin, Animatable, ChildNode, InnerHTML, ParentNode {
  readonly classList: DOMTokenList;
}

interface DOMEvent<T extends EventTarget> extends Event {
  target: T
}

class AppAccordian {

  state: { repos: any[]; };

  constructor() {

    this.state = {
      repos: [],
    };

  }

  loadData(cb: any) {
    const self = this;
    axios.get('http://localhost:8000/api/repos')
      .then(function (response) {
        if (response.data.length > 0) {
          self.state.repos = response.data;
          cb();
        }
      })
      .catch(function (error) {
        console.error(error);
      });

  }

  initAcc(elem: any, option: any) {
    const accview = document.getElementById("acc-view");
    accview.addEventListener('click', function (e: DOMEvent<HTMLInputElement>) {
      if (!e.target.matches(elem + ' .a-btn')) return;
      else {
        if (!e.target.parentElement.classList.contains('active')) {
          if (option == true) {
            var elementList = document.querySelectorAll(elem + ' .a-container');
            Array.prototype.forEach.call(elementList, function (e: Element) {
              e.classList.remove('active');
            });
          }
          e.target.parentElement.classList.add('active');
        } else {
          e.target.parentElement.classList.remove('active');
        }
      }
    });
  }

  formattedNumber(x: number | string) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  generateView() {
    const accview = document.getElementById("acc-view");
    let htmlCollection: string[] = [];
    this.state.repos.forEach((val, id) => {
      let template = `<div class="a-container">
              <p class="a-btn">
                <img src="https://github.com/twbs.png" alt="twbs" width="32" height="32" class="rounded-circle flex-shrink-0">
                &nbsp;&nbsp;${val.name}&nbsp;&nbsp;&nbsp;<i class="fas fa-star"></i> ${this.formattedNumber(val.stars_count)}<span></span>
              </p>
              <div class="a-panel">
                <table class="table">
                  <tr>
                    <td colspan="2"><p><strong>${val.description}</strong></p></td>
                  </tr>
                  <tr>
                    <td><strong>Repository ID:</strong></td>
                    <td>${val.repo_id}</td>
                  </tr>
                  <tr>
                    <td><strong>URL:</strong></td>
                    <td><a target="_blank" href="${val.url}">${val.url}</a></td>
                  </tr>
                  <tr>
                    <td><strong>Created Date:</strong></td>
                    <td>${val.created_date}</td>
                  </tr>
                  <tr>
                    <td><strong>Push Date:</strong></td>
                    <td>${val.push_date}</td>
                  </tr>
                </table>
              </div>
            </div>`;
      htmlCollection.push(template);
    });
    accview.innerHTML = htmlCollection.join("");
  }

}

const domReady = (callBack: () => void) => {
  if (document.readyState === "loading") {
    document.addEventListener('DOMContentLoaded', callBack);
  }
  else {
    callBack();
  }
}

domReady(() => {
  const appView = new AppAccordian();
  appView.loadData(() => {
    appView.initAcc('.accordion.v1', true);
    appView.generateView();
  });
});
