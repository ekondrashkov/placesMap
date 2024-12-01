import { createI18n, type I18nOptions } from 'vue-i18n'

export enum Language {
  EN = 'en',
  RU = 'ru',
}

const options: Readonly<I18nOptions> = {
  legacy: false,
  globalInjection: true,
  locale: Language.EN,
  fallbackLocale: Language.EN,
  messages: {
    [Language.EN]: {
      titles: {
        name: 'My favorite places map',
        markers: 'Markers:',
        addMarkersToMap: 'Add markers to the map',
        deleteConfirmation: 'Delete marker confirmation',
      },
      buttons: {
        map: 'Map',
        about: 'About',
        cancel: 'Cancel',
        delete: 'Delete',
        russian: 'Russian',
        english: 'English',
      },
      texts: {
        deleteDialog: 'Delete marker on address:',
        addMarkersToMap:
          'Activate the addition mode by clicking the "+" button in the right bottom corner and select the desired place on the map',
      },
      tooltips: {
        enableAddMode: 'Enable add marker mode',
        disableAddMode: 'Disable add marker mode',
      },
      about: {
        description:
          'Map with ability to add and delete favorite places. Markers are stored in localStorage.',
        howToHandle: 'How to add and delete markers?',
        howToHandle1:
          'Toggle the "+" button in the bottom right corner in the "Map" section in edit mode',
        howToHandle2:
          'To add a marker, click on the place on the map. The marker will appear on the map and in the list.',
        howToHandle3: 'To delete a marker, you can delete it from the list.',
        comment:
          'Storage of data is organized as a service emulating a backend, data is stored in localStorage.',
      },
    },
    [Language.RU]: {
      titles: {
        name: 'My favorite places map',
        markers: 'Маркеры:',
        addMarkersToMap: 'Добавьте маркеры на карту',
        deleteConfirmation: 'Подтвердите удаление маркера',
      },
      buttons: {
        map: 'Карта',
        about: 'О проекте',
        cancel: 'Отмена',
        delete: 'Удалить',
        russian: 'Русский',
        english: 'Английский',
      },
      texts: {
        deleteDialog: 'Удалить маркер адреса:',
        addMarkersToMap:
          'Для этого активируйте режим добавления нажав на кнопку "+" в правом нижнем углу и выберите нужное место на карте',
      },
      tooltips: {
        enableAddMode: 'Включить режим добавления',
        disableAddMode: 'Выключить режим добавления',
      },
      about: {
        description:
          'Карта с возможностью добавления и удаления любимых мест. Метки хранятся в localStorage.',
        howToHandle: 'Как добавлять и удалять метки?',
        howToHandle1:
          'Переключите кнопку "+" в правом нижнем углу в разделе “Карта” в режим редактировния',
        howToHandle2:
          'Кликните на место на карте для добавления метки. Метка появится на карте и в списке.',
        howToHandle3: 'Удалить метку можно из списка.',
        comment:
          'Локальное хранение данных организовано в виде сервиса, эмулирующего бекенд, данные хранятся в localStorage.',
      },
    },
  },
}

export const i18n = createI18n(options)
