import * as Font from 'expo-font';

const customFonts = {
  'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
  // add more fonts here if needed
}

export const loadFonts = async () => {
  await Font.loadAsync(customFonts);
}