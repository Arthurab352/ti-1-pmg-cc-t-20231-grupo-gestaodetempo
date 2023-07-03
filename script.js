document.addEventListener('DOMContentLoaded', function() {
  var modal;
  var calendar;

  function leDados() {
    let strDados = localStorage.getItem('db');
    let objDados = {};

    if (strDados) {
      objDados = JSON.parse(strDados);
    } else {
      objDados = {
        events: [
          {
            "id": 1,
            "title": "Exemplo de Evento",
            "start": "2023-07-11",
            "end": "2023-07-11"
          }
        ]
      };
      salvaDados(objDados);
    }
    return objDados;
  }

  function salvaDados(dados) {
    localStorage.setItem('db', JSON.stringify(dados));
  }

  function searchEventos() {
    let input = document.getElementById("searchbar").value.toLowerCase();
    let eventBox = document.getElementById("eventBox");
    eventBox.innerHTML = "";

    let objDados = leDados();
    let events = objDados.events;

    events.forEach(function (eventData) {
      if (eventData.title.toLowerCase().includes(input)) {
        var eventDiv = document.createElement("div");
        eventDiv.className = "event";
        eventDiv.innerText = eventData.title;

        var priority = localStorage.getItem("priority_" + eventData.id);
        if (priority) {
          eventDiv.classList.add(priority);
        }

        var selectorDiv = document.createElement("button");
        selectorDiv.className = "prioritySelector";
        selectorDiv.innerText = "...";
        selectorDiv.addEventListener("click", function () {
          priorityPopup = eventDiv.querySelector(".priorityPopup");
          if (priorityPopup.style.display === "block") {
            priorityPopup.style.display = "none";
            eventDiv.classList.remove("selected");
          } else {
            priorityPopup.style.display = "block";
            eventDiv.classList.add("selected");
          }
        });

        var priorityPopup = document.createElement("div");
        priorityPopup.className = "priorityPopup";
        priorityPopup.style.display = "none";

        var priorityText = document.createElement("p");
        priorityText.innerText = "Selecionar Prioridade:";

        var highRadio = document.createElement("input");
        highRadio.type = "radio";
        highRadio.name = "priority_" + eventData.id;
        highRadio.value = "high";
        highRadio.id = "high_" + eventData.id;

        var highLabel = document.createElement("label");
        highLabel.htmlFor = "high_" + eventData.id;
        highLabel.innerText = "Alta";

        var mediumRadio = document.createElement("input");
        mediumRadio.type = "radio";
        mediumRadio.name = "priority_" + eventData.id;
        mediumRadio.value = "medium";
        mediumRadio.id = "medium_" + eventData.id;

        var mediumLabel = document.createElement("label");
        mediumLabel.htmlFor = "medium_" + eventData.id;
        mediumLabel.innerText = "Média";

        var lowRadio = document.createElement("input");
        lowRadio.type = "radio";
        lowRadio.name = "priority_" + eventData.id;
        lowRadio.value = "low";
        lowRadio.id = "low_" + eventData.id;

        var lowLabel = document.createElement("label");
        lowLabel.htmlFor = "low_" + eventData.id;
        lowLabel.innerText = "Baixa";

        priorityPopup.appendChild(priorityText);
        priorityPopup.appendChild(highRadio);
        priorityPopup.appendChild(highLabel);
        priorityPopup.appendChild(mediumRadio);
        priorityPopup.appendChild(mediumLabel);
        priorityPopup.appendChild(lowRadio);
        priorityPopup.appendChild(lowLabel);

        priorityPopup.addEventListener("change", function (e) {
          var priority = e.target.value;
          eventDiv.classList.remove("high", "medium", "low");
          eventDiv.classList.add(priority);
          priorityPopup.style.display = "none";
          eventDiv.classList.remove("selected");

          localStorage.setItem("priority_" + eventData.id, priority);
        });

        eventDiv.appendChild(selectorDiv);
        eventDiv.appendChild(priorityPopup);
        eventBox.appendChild(eventDiv);
      }
    });
  }

  function salvarDados() {
    let titulo2 = document.getElementById("titulo2").value;
    let data = document.getElementById("data").value;
    let tarefas = document.getElementById("Tarefas").value;
    let time = document.getElementById("time").value;

    let event = {
      title: titulo2,
      start: data,
      end: time,
      id: Date.now()
    };

    var banco = leDados();
    banco.events.push(event);
    salvaDados(banco);

    document.getElementById("titulo2").value = "";
    document.getElementById("data").value = "";
    document.getElementById("Tarefas").value = "";
    document.getElementById("time").value = "";
    modal.close();
    calendar.addEvent(event);
  }

  modal = document.querySelector(".dialog");
  
  var calendarEl = document.getElementById('calendar');

  calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    headerToolbar: {
      start: 'today prev,next',
      center: 'title',
      end: 'dayGridMonth,dayGridWeek,dayGridDay'
    },
    buttonText: {
      today: 'Hoje',
      month: 'Mês',
      week: 'Semana',
      day: 'Dia',
    },
    locale: 'pt-br',
    events: leDados().events, 

  });
  calendar.render();
  
  var btnAddEvent = document.getElementById('btnAddEvent');
  btnAddEvent.addEventListener('click', function() {
    modal.showModal();
  });

  var btnSalvar = document.getElementById('salvar');
  btnSalvar.addEventListener('click', salvarDados);

  var searchbar = document.getElementById("searchbar");
  searchbar.addEventListener("input", searchEventos);

  searchEventos();
});

//localStorage.clear(); 
//retirar duas barras acima para limpar os dados

