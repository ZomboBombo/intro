<a id="en">EN</a> | [RU](#ru)

# «Intro»

Welcome to my _**«Intro's»**_ repo! Explore sources and enjoy.

A short guide how to explore this repo:

1. If you're going to explore the sources right here, in the repo, [skip to the _**«Structure»**_](#structure-en) section.

2. If you want, for some reason, to clone the repo and explore it locally, after cloning use this:
    
    - `yarn`: to install all dependencies;
    - `yarn start`: to start the project;
    - _`(optionaly)`_, you can:
      
      - `yarn build`: to just build the _Production_ project version;
      - `yarn preview`: to _preview_ the _Production_ project version.


### <a id="structure-en">Structure:</a>

- `cutom-vite-plugins/`: custom solutions for the _«Vite»_ configuration;

- `public/`: _static content_; contains _graphics_, _fonts_, _videos_ and some _data-files_;

- `src/`: a directory that needs no special _**intro**_; the most important part of the project – contains _everything_:
  
  - `/js/`: script files with proj's business-logic:
    
    - `/_core/`: _service directory_; contains modules that don't generate any business-logic, but keep important utilities such as _global types_, _interfaces_ and the like.

    - `/initializers/`: business-logic _initializers_.

    - `/modules/`: business-logic _modules_.

    - `/utils/`: _utilities_ – _Decorators_, _Loggers_ and other _Helpers_.

    - `/main.ts`: entry point of the business-logic.

    <hr>

  - `/pug/`: markup templates made with _«Pug»_:

    - `/base/`: entry points of the templates and data-structures; also contains a _primary layout_ of all templates.

    - `/data/`: data-structures for _Pug-templates_.

    - `/mixins/`: main components (templates) that create the project markup; contains _`/components/`, `/ui/` and `/utils/`_ directories.

    - `/sections/`: big semantic blocks of the proj.

    - `/to-html/`: entry points for template includes; actually, it's an proj's _Pages_.

    <hr>

  - `/sass/`: stylesheets made with _SCSS-syntax_:

    - `/blocks/`: intended for _small semantic elements (blocks)_; currently is empty...

    - `/components/`: main proj's components stylesheets.

    - `/modals/`: configuration and styles for proj's _Modals_.

    - `/sections/`: big semantic blocks styles; refers to the _`/pug/sections/`_.

    - `/system/`: _service style files_ – configurations, reusable project variables, setups and other stuff.

    - `/ui/`: _UI-components styles_; common design-components used in many places of the proj.

    - `/utils/`: primary _container styles_, _Helpers_ and some specific component styles.

    - `/styles.scss`: entry point for all of the styles.

<hr>

### Made with ♥ and:
![Pug](public/img/icons/_readme-logo-pug.svg)
![Sass](public/img/icons/_readme-logo-sass.svg)
![TypeScript](public/img/icons/_readme-logo-ts.svg)
![Vite](public/img/icons/_readme-logo-vite.svg)

<hr>
<br>

[EN](#en) | <a id="ru">RU</a>

# «Intro»

Добро пожаловать в репо моего _**«Intro»**_! Исследуйте исходники и наслаждайтесь.

Краткий гайд о том, как исследовать репо:

1. Если Вы собираетесь изучать исходники прямо тут, в репо, смело [скипайте к разделу «Структура»](#structure-ru).

2. Если Вы хотите, по какой-то причине, склонировать репо, чтобы исследовать его у себя локально, после клонирования воспользуйтесь этим:
    
    - `yarn`: установит все проектные зависимости;
    - `yarn start`: запустит проект;
    - _`(опционально)`_, Вы можете:
      
      - `yarn build`: просто сбилдить _Production-версию_ проекта;
      - `yarn preview`: запустить _предпросмотр Production-версии_ проекта.

### <a id="structure-ru">Структура:</a>

- `cutom-vite-plugins/`: кастомные решения для конфигурации _«Vite»_;

- `public/`: _статика_; содержит _графику_, _шрифты_, _видео_ и некоторые _data-файлы_;

- `src/`: директория, не требующая особого представления; наиважнейшая часть проекта – содержит _всё_:

  - `/js/`: файлы скриптов с описанием бизнес-логики проекта:
    
    - `/_core/`: _служебная директория_; содержит модули, не генерирующие никакой бизнес-логики, но хранящие важные утилиты, такие как _глобальные типы_, _интерфейсы_ и тому подобное.

    - `/initializers/`: _инициализаторы_ бизнес-логики.

    - `/modules/`: _модули_ бизнес-логики.

    - `/utils/`: _утилиты_ – _Декораторы_, _Логгеры_ и другие _Помогаторы_.

    - `/main.ts`: главная точка вхождения бизнес-логики.

    <hr>

  - `/pug/`: шаблоны разметки, сотворённые с помощью _«Pug»_:

    - `/base/`: точки вхождения шаблонов и data-структур; также содержит _главный layout_ для всех шаблонов.

    - `/data/`: data-структуры для _Pug-шаблонов_.

    - `/mixins/`: основные компоненты (шаблоны), создающие разметку проекта; содержит _`/components/`, `/ui/` и `/utils/`_ директории.

    - `/sections/`: большие смысловые блоки проекта.

    - `/to-html/`: точки вхождения для включений смысловых шаблонов; в общем-то, это _Страницы_ проекта.

    <hr>

  - `/sass/`: таблицы стилей, сотворённые с помощью _SCSS-синтаксиса_:

    - `/blocks/`: предназначается для _небольших смысловых элементов (блоков)_; в настоящее время пустует...

    - `/components/`: стили для основных компонентов проекта.

    - `/modals/`: конфигурации и стили для проектных _Модалок_.

    - `/sections/`: стили для больших смысловых блоков; соотносится с _`/pug/sections/`_.

    - `/system/`: _служебные стилевые файлы_ – конфигурации, переиспользуемые проектные переменные, сетапы и тд-и-тп.

    - `/ui/`: _стили UI-компонентов_; общие дизайн-компоненты, использующиеся во многих частях проекта.

    - `/utils/`: главные _container-стили_, _Помогаторы_ и некоторые стили для специфичных компонентов.

    - `/styles.scss`: точка вхождения для всех таблиц стилей.

<hr>

### Сделано с ♥ и:
![Pug](public/img/icons/_readme-logo-pug.svg)
![Sass](public/img/icons/_readme-logo-sass.svg)
![TypeScript](public/img/icons/_readme-logo-ts.svg)
![Vite](public/img/icons/_readme-logo-vite.svg)

<hr>
