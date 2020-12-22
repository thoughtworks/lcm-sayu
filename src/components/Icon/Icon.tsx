import { FunctionComponent } from 'react'

type IconProps = {
  name: 'ChevronRight' | 'Add' | 'BackArrow' | 'Close'
  alt: string
}

const IconsLocation = {
  ChevronRight: '/img/chevron_right.svg',
  Add: '/img/add.svg',
  BackArrow: '/img/back_arrow.svg',
  Close: '/img/close.svg',
}

const Icon: FunctionComponent<IconProps> = ({ name, alt }) => (
  <img src={IconsLocation[name]} alt={alt} />
)

export { Icon }
