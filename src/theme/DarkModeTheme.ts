interface IDarkModeTheme {
  colors: {
    backgrounds: string;
    texts: string;
    buttons: string;
    hovers: string;
    inputs: string;
  };
}

const darkModeTheme: IDarkModeTheme = {
  colors: {
    backgrounds: '#1e1e1e',
    texts: '#e4e4e4',
    buttons: '#3a6f52',
    hovers: '#5e9276',
    inputs: '#505c5e',
  },
};

export default darkModeTheme;
