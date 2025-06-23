import { themeConfig } from '../theme';

/**
 * Generates CSS variables from the theme configuration
 * This can be used to inject theme values as CSS variables
 */
export const generateCssVariables = () => {
  const variables: Record<string, string> = {};
  
  // Process colors
  Object.entries(themeConfig.colors).forEach(([colorName, colorValue]) => {
    if (typeof colorValue === 'object') {
      Object.entries(colorValue).forEach(([shade, value]) => {
        variables[`--color-${colorName}-${shade}`] = value;
      });
    } else {
      variables[`--color-${colorName}`] = colorValue;
    }
  });
  
  // Process fonts
  Object.entries(themeConfig.fonts).forEach(([fontName, fontConfig]) => {
    variables[`--font-${fontName}`] = (fontConfig as any).family;
    
    if ((fontConfig as any).weights) {
      Object.entries((fontConfig as any).weights).forEach(([weight, value]) => {
        variables[`--font-weight-${fontName}-${weight}`] = value.toString();
      });
    }
  });
  
  // Process other theme values as needed
  variables['--app-background-gradient'] = themeConfig.backgrounds.app.gradient;
  variables['--page-background-color'] = themeConfig.backgrounds.page.color;
  
  return variables;
};

/**
 * Applies theme CSS variables to a DOM element
 * @param element The DOM element to apply variables to (defaults to document.documentElement)
 */
export const applyThemeVariables = (element = document.documentElement) => {
  const variables = generateCssVariables();
  
  Object.entries(variables).forEach(([name, value]) => {
    element.style.setProperty(name, value);
  });
};

/**
 * Generates a CSS class string from theme configuration
 * @param path The dot-notation path to the theme value
 * @returns A CSS class string
 * 
 * @example
 * // Returns "bg-gradient-to-r from-amber-600 to-amber-700"
 * getThemeClass('components.purchaseModal.button')
 */
export const getThemeClass = (path: string): string => {
  const value = themeConfig.getValue(path);
  return value || '';
};
