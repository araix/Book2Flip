import { useMemo } from 'react';
import { themeConfig, getThemeValue } from './themeConfig';

/**
 * Custom hook for accessing theme values
 * 
 * @example
 * // In a component:
 * const theme = useTheme();
 * return <div style={{ color: theme.colors.primary[600] }}>Themed text</div>;
 * 
 * // Or access specific values:
 * const { getValue } = useTheme();
 * return <div style={{ color: getValue('colors.primary.600') }}>Themed text</div>;
 */
export const useTheme = () => {
  const getValue = useMemo(() => getThemeValue, []);
  
  return {
    ...themeConfig,
    getValue,
  };
};
