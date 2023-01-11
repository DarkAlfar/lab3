(() => {
    const dynamicSelect = (id1, id2) => {
      // Определение переменных, ссылающихся на списки
      const sel1 = document.getElementById(id1);
      const sel2 = document.getElementById(id2);
      // Клонирование динамического списка
      const clone = sel2.cloneNode(true);
      // Определение переменных для клонированных элементов списка
      const clonedOptions = clone.getElementsByTagName("option");
      // Вызов функции собирающей вызываемый список
      refreshDynamicSelectOptions(sel1, sel2, clonedOptions);
      // При изменении выбранного элемента в первом списке: // вызов функции пересобирающей вызываемый список
      sel1.addEventListener('change', () => {
        refreshDynamicSelectOptions(sel1, sel2, clonedOptions);
      });
    };
  
    // Функция для сборки динамического списка
    const refreshDynamicSelectOptions = (sel1, sel2, clonedOptions) => {
      // Удаление всех элементов динамического списка
      while (sel2.options.length) {
        sel2.remove(0);
      }
      const selectedOption = sel1.options[sel1.selectedIndex].value;
      // Перебор клонированных элементов списка
      for (let i = 0; i < clonedOptions.length; i++) {
        const option = clonedOptions[i];
        // Если название класса клонированного option эквивалентно "select"
        // либо эквивалентно значению option первого списка
        if (option.classList.contains('select') ||
          option.classList.contains(selectedOption)) {
          // его нужно клонировать в динамически создаваемый список
          sel2.appendChild(option.cloneNode(true));
        }
      }
      // Отправляем событие change выбранного select
      const event = document.createEvent('HTMLEvents');
      event.initEvent('change', true, false);
      sel2.dispatchEvent(event);
    };
  
    // Вызов скрипта при загрузке страницы
    document.addEventListener("DOMContentLoaded", () => {
      dynamicSelect("select-1", "select-2");
      //dynamicSelect("select-2", "select-3");
    });

    //расчёт
    const subm = document.getElementById("sub");
    subm.addEventListener("click", (event) => {
        const sel1 = document.getElementById("select-1")
        const sel2 = document.getElementById("select-2")
        const mon = document.getElementById("money")
        const result = document.getElementById("res")
        const result2 = document.getElementById("res2")
        let a = sel1.options[sel1.selectedIndex].text
        let b_1 = `${sel2.value[0]}${sel2.value[1]}` //процент
        let b_2 = `${sel2.value[3]}${sel2.value[4]}` //месяцы
        let c = mon.value
        var proc = (+c + c/100*(b_1/12*b_2))
        console.log(sel1.options[sel1.selectedIndex].text, " ", sel2.value, " ", mon.value, " ", result)
        if (sel1.value != "select" && sel2.value != "select" && mon.value) {
            result.innerHTML = `Вклад ${a} на срок ${b_2} месяцев(а) на сумму ${c} руб`
            result2.innerHTML = `В конце срока вы получите ${proc}`
        }
    })
  })();