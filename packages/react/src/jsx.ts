// 返回ReactElement数据结构

import { REACT_ELEMENT_TYPE } from 'shared/ReactSymbols'
import {
  ElementType,
  Key,
  Props,
  ReactElement,
  Ref,
  Type
} from 'shared/ReactTypes'

/**
 * 生成ReactElement数据结构
 * @description:
 */
function ReactElement(
  type: Type,
  key: Key,
  ref: Ref,
  props: Props
): ReactElement {
  const element = {
    $$typeof: REACT_ELEMENT_TYPE, // 指定当前数据结构为ReactElement
    type,
    key,
    ref,
    props,
    __author: 'HHX' // 与真实React区分
  }

  return element
}
// ? 为什么子节点不在config里面的children传入
// 参考https://juejin.cn/post/6876030404789436429可能是因为实现难吧
export function jsx(type: ElementType, config: any, ...maybeChildren: any[]) {
  let key: Key = null
  const props: Props = {}
  let ref: Ref = null

  // 遍历config赋值给props对象，并赋值单独key与ref
  for (const prop in config) {
    const val = config[prop]

    // 将key值转换为字符串
    if (prop === 'key') {
      if (val !== undefined) {
        key = '' + val
      }
      continue
    }

    // 确保ref赋值不为undefined
    if (prop === 'ref') {
      if (val !== undefined) {
        ref = val
      }
      continue
    }

    // 将config本身的属性赋值给props,原型链的则不赋值
    if (Object.hasOwn(config, prop)) {
      props[prop] = val
    }
  }

  // 根据传入子节点数量赋值props.children，child或者child[]
  const maybeChildrenLength = maybeChildren.length

  if (maybeChildrenLength) {
    if (maybeChildrenLength === 1) {
      props.children = maybeChildren[0]
    } else {
      props.children = maybeChildren
    }
  }

  return ReactElement(type, key, ref, props)
}

// 真实的React在jsxDEV有额外的环境检查等实现
export const jsxDEV = jsx