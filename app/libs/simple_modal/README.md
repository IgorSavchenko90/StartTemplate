# SimpleModal
Универсальный скрипт для создания модальных окон.


## Подключение
------

```
<!-- css -->
<link rel="stylesheet" href="libs/SimpleModal/simple_modal.css">

<!-- js -->
<script src="libs/SimpleModal/simple_modal.js"></script>

<!-- on your common.js -->
simpleModal.init();
```


## Шаблон: 
------
```
<!-- Overlay -->
<div class="simpleModalOverlay"></div>

<!-- modals -->
<div class="simpleModalWindowWrap modal1">
  <div class="simpleModalTable">
    <div class="simpleModalCell">
      <div class="simpleModalWindow">
        <span class="simpleModalWindowClose"></span>
        // Your code...
      </div>
    </div>
  </div>
</div>

<div class="simpleModalWindowWrap modal_width_text">
  <div class="simpleModalTable">
    <div class="simpleModalCell">
      <div class="simpleModalWindow">
        <span class="simpleModalWindowClose"></span>
        <!-- if need -->
        <div class="simpleModalWindowText"></div>
      </div>
    </div>
  </div>
</div>

```
**modal1**  - идентефикатор модального окна



## Вызов окна:
------
```
<span data-simple_modal="modal1">modal1</span>
```



## Методы:
------

### Открывает модальное окно
```
simpleModal.modalOpen( "id", "content" );
```
**id**  - (обязательный) идентефикатор модального окна

**content**  - (не обязательный) текст или блок html кода, который будет добавлен в блок "simpleModalWindowText"



### Закрывает модальное окно
```
simpleModal.modalClose( "id" );
```
**id**  - (обязательный) идентефикатор модального окна