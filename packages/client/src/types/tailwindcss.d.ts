interface ResolveConfigUtils {
  negative: (scale: Record<string, string>) => Record<string, string>
  breakpoints: (
    screens: Screens
  ) => Screens & Record<'screen-xl' | 'screen-sm' | 'screen-md' | 'screen-lg' | 'screen-xl', string>
}

type ResolveThemePathFunction = <K extends keyof Omit<Theme, 'extend'>>(key: K) => Theme[K]

type ResolveConfigFunction<Values extends object> = (theme: ResolveThemePathFunction) => Values

type ThemeSection<Values extends object> = ResolveConfigFunction<Values> | Values | false

export interface TailwindcssConfiguration {
  prefix?: string
  important?: boolean
  separator?: string
  theme?: Theme
  variants?: Partial<Record<keyof CorePlugins, Variant[]>>
  corePlugins?: CorePlugins
  plugins?: any[]
  purge?: Purge
}

export interface CorePlugins {
  overflow?: false
  justifyContent?: false
  tableLayout?: false
  whitespace?: false
  transformOrigin?: false
  scale?: false
  boxShadow?: false
  stroke?: false
  strokeWidth?: false
  textAlign?: false
  textTransform?: false
  position?: false
  fontStyle?: false
  gridRow?: false
  gridRowStart?: false
  gridRowStartEnd?: false
  backgroundRepeat?: false
  backgroundAttachment?: false
  backgroundColor?: false
  backgroundSize?: false
  appearance?: false
  borderStyle?: false
  boxSizing?: false
  display?: false
  alignSelf?: false
  alignContent?: false
  alignItems?: false
  rotate?: false
  translate?: false
  flex?: false
  flexWrap?: false
  flexDirection?: false
  flexShrink?: false
  flexGrow?: false
  clear?: false
  objectPosition?: false
  objectFit?: false
  skew?: false
  transitionDuration?: false
  transitionProperty?: false
  visibility?: false
  wordBreak?: false
  gridAutoFlow?: false
  verticalAlign?: false
  borderCollapse?: false
  borderColor?: false
  float: false
  outline?: false
  pointerEvents?: false
  resize?: false
  fill?: false
  userSelect?: false
  fontSmoothing?: false
  transitionTimingFunction?: false
  listStylePosition?: false
  accessibility?: false
  textDecoration?: false
  textColor?: false
}

export interface Theme {
  /**
   * @see {@link https://tailwindcss.com/docs/theme/#extending-the-default-theme}
   */
  extend?: Theme
  screens?: Screens
  colors?: Record<string, string | Record<string, string>>
  spacing?: ThemeSection<Record<string, string>>
  padding?: ThemeSection<Record<string, string>>
  margin?: ThemeSection<Record<string, string>>
  backgroundPosition?: ThemeSection<Record<string, string>>
  backgroundSize?: ThemeSection<Record<string, string>>
  backgroundColor?: ThemeSection<Record<string, string>>
  borderRadius?: ThemeSection<Record<string, string>>
  borderWidth?: ThemeSection<Record<string, string>>
  boxShadow?: ThemeSection<Record<string, string>>
  container?: ThemeSection<Record<string, string>>
  cursor?: ThemeSection<Record<string, string>>
  fill?: ThemeSection<Record<string, string>>
  flex?: ThemeSection<Record<string, string>>
  flexGrow?: ThemeSection<Record<string, string>>
  flexShrink?: ThemeSection<Record<string, string>>
  fontFamily?: ThemeSection<Record<string, string[]>>
  fontSize?: ThemeSection<Record<string, string>>
  fontWeight?: ThemeSection<Record<string, string>>
  inset?: ThemeSection<Record<string, string>>
  letterSpacing?: ThemeSection<Record<string, string>>
  lineHeight?: ThemeSection<Record<string, string>>
  listStyleType?: ThemeSection<Record<string, string>>
  maxHeight?: ThemeSection<Record<string, string>>
  minHeight?: ThemeSection<Record<string, string>>
  minWidth?: ThemeSection<Record<string, string>>
  objectPosition?: ThemeSection<Record<string, string>>
  opacity?: ThemeSection<Record<string, string>>
  order?: ThemeSection<Record<string, string>>
  stroke?: ThemeSection<Record<string, string>>
  strokeWidth?: ThemeSection<Record<string, string>>
  zIndex?: ThemeSection<Record<string, string>>
  gridTemplateColumns?: ThemeSection<Record<string, string>>
  gridColumn?: ThemeSection<Record<string, string>>
  gridColumnStart?: ThemeSection<Record<string, string>>
  gridColumnEnd?: ThemeSection<Record<string, string>>
  gridTemplateRows?: ThemeSection<Record<string, string>>
  gridRow?: ThemeSection<Record<string, string>>
  gridRowStart?: ThemeSection<Record<string, string>>
  gridRowEnd?: ThemeSection<Record<string, string>>
  transformOrigin?: ThemeSection<Record<string, string>>
  scale?: ThemeSection<Record<string, string>>
  rotate?: ThemeSection<Record<string, string>>
  translate?: ThemeSection<Record<string, string>>
  skew?: ThemeSection<Record<string, string>>
  transitionProperty?: ThemeSection<Record<string, string>>
  transitionTimingFunction?: ThemeSection<Record<string, string>>
  transitionDuration?: ThemeSection<Record<string, string>>
  negativeMargin?: ThemeSection<Record<string, string>>
  textColor?: ThemeSection<Record<string, string>>
  darkSelector?: string
}

export interface Screens {
  xs?: string
  sm?: string
  md?: string
  lg?: string
  xl?: string
}

export type Variant =
  | 'responsive'
  | 'group-hover'
  | 'focus-within'
  | 'first'
  | 'last'
  | 'odd'
  | 'even'
  | 'hover'
  | 'focus'
  | 'active'
  | 'visited'
  | 'disabled'

export interface Purge {
  enabled?: boolean
  content?: string[]
}
