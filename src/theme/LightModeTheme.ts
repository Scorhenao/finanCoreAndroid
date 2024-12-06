interface ILightModeTheme {
  colors: {
    backgrounds: string;
    texts: string;
    buttons: string;
    hovers: string;
    inputs: string;
  };
}

const lightModeTheme: ILightModeTheme = {
  colors: {
    backgrounds: '#ceccc4',
    texts: '#142328',
    buttons: '#45725c',
    hovers: '#8ecda8',
    inputs: '#7d9799',
  },
};

export default lightModeTheme;
