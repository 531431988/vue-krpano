import Vue from 'vue'
import {
  Field,
  RadioGroup,
  Radio,
  Checkbox,
  CheckboxGroup,
  Cell,
  CellGroup,
  Row,
  Col,
  Grid,
  GridItem,
  Divider,
  Icon,
  Button,
  Tag,
  DropdownMenu,
  DropdownItem,
  Search,
  Tab, Tabs,
  Tabbar,
  TabbarItem,
  Image,
  Popup,
  Collapse,
  CollapseItem,
  NavBar,
  Uploader,
  Toast,
  ActionSheet,
  Sticky,
  Skeleton,
  Card,
  Panel,
  Swipe,
  SwipeItem,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton
} from 'vant'
import '../less/theme.less'
const components = {
  Field,
  RadioGroup,
  Radio,
  Checkbox,
  CheckboxGroup,
  Cell,
  CellGroup,
  Row,
  Col,
  Grid,
  GridItem,
  Divider,
  Icon,
  Button,
  Tag,
  DropdownMenu,
  DropdownItem,
  Search,
  Tab, Tabs,
  Tabbar,
  TabbarItem,
  Image,
  Popup,
  Collapse,
  CollapseItem,
  NavBar,
  Uploader,
  Toast,
  ActionSheet,
  Sticky,
  Skeleton,
  Card,
  Panel,
  Swipe,
  SwipeItem,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton
}
Object.keys(components).forEach(key => {
  Vue.component(components[key].name, components[key])
})
