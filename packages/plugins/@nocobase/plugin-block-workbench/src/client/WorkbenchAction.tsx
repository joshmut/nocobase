/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { useFieldSchema } from '@formily/react';
import { Action, Icon, useCompile, useComponent, withDynamicSchemaProps } from '@nocobase/client';
import { Avatar } from 'antd';
import { createStyles } from 'antd-style';
import React, { useContext } from 'react';
import { WorkbenchBlockContext } from './WorkbenchBlock';
import { WorkbenchLayout } from './workbenchBlockSettings';

const useStyles = createStyles(({ token, css }) => ({
  // 支持 css object 的写法
  action: css`
    background-color: transparent;
    border: 0;
    height: auto;
    box-shadow: none;
  `,
  title: css`
    margin-top: ${token.marginSM}px;
    text-overflow: ellipsis;
    overflow: hidden;
  `,
}));

function Button() {
  const fieldSchema = useFieldSchema();
  const icon = fieldSchema['x-component-props']?.['icon'];
  const backgroundColor = fieldSchema['x-component-props']?.['iconColor'];
  const { layout } = useContext(WorkbenchBlockContext);
  const { styles, cx } = useStyles();
  const compile = useCompile();
  const title = compile(fieldSchema.title);
  return layout === WorkbenchLayout.Grid ? (
    <div title={title} style={{ width: '100%', overflow: 'hidden' }} className="nb-action-panel-container">
      <Avatar style={{ backgroundColor }} size={54} icon={<Icon type={icon} />} />
      <div className={cx(styles.title)}>{title}</div>
    </div>
  ) : (
    <span>{title}</span>
  );
}

export const WorkbenchAction = withDynamicSchemaProps((props) => {
  const { className, ...others } = props;
  const { styles, cx } = useStyles() as any;
  const fieldSchema = useFieldSchema();
  const Component = useComponent(props?.targetComponent) || Action;
  return (
    <Component
      className={cx(className, styles.action, 'nb-action-panel')}
      {...others}
      icon={null}
      title={<Button />}
      confirmTitle={fieldSchema.title}
    />
  );
});
