import React from 'react';
import { connect } from 'react-redux';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Action from './Action';
import Input from './Input';
import InputList from './InputList';

const toType = function(obj) {
  return {}.toString
    .call(obj)
    .match(/\s([a-zA-Z]+)/)[1]
    .toLowerCase();
};

const TableData = ({ editor_data, page, rowsPerPage }) => {
  let inc = 0;

  if (editor_data) {
    return (
      <React.Fragment>
        <TableBody>
          {editor_data.map((obj, i) => {
            inc += obj.visible ? 1 : 0;
            if (
              inc > page * rowsPerPage &&
              inc < page * rowsPerPage + rowsPerPage + 1 &&
              obj.visible
            ) {
              const isList = toType(obj.data) === 'array' ? true : false;

              return (
                <TableRow key={`${i}_${obj.route}`}>
                  <TableCell>
                    <b>{i + 1}</b>
                  </TableCell>
                  <TableCell>
                    <i style={{ color: ' rgba(0, 0, 0, 0.54)', fontSize: '0.75rem' }}>
                      {obj.route}
                    </i>
                  </TableCell>
                  <TableCell>
                    <b>{obj.key.name}</b>
                  </TableCell>
                  <TableCell>
                    <Action index={i} obj={obj} />
                  </TableCell>

                  <TableCell>
                    {!isList ? (
                      <Input index={i} text={obj.data} disabled={obj.disabledEdit} />
                    ) : (
                      <InputList index={i} obj={obj} />
                    )}
                  </TableCell>
                </TableRow>
              );
            } else {
              return <React.Fragment key={`${i}_${obj.route}`} />;
            }
          })}
        </TableBody>
      </React.Fragment>
    );
  } else {
    return <TableBody />;
  }
};

const mapStateToProps = ({ editor_data }) => {
  return { editor_data };
};

export default connect(mapStateToProps)(TableData);

// let editor_data = [];

// const toType = function(obj) {
//   return {}.toString
//     .call(obj)
//     .match(/\s([a-zA-Z]+)/)[1]
//     .toLowerCase();
// };

// const iterate = ({ data, key = '', route = '', keys = [] }) => {
//   let type = toType(data);
//   if (key) {
//     keys = keys.concat(key);
//     route += toType(key.name) === 'number' ? `[${key.name}]` : `["${key.name}"]`;
//   }

//   if (type === 'object') {
//     Object.keys(data).forEach((el, i) => {
//       iterate({
//         data: data[el],
//         key: { name: el, type: toType(data[el]), title: el },
//         route,
//         keys,
//       });
//     });
//   } else if (type === 'array' && !['fr', 'en', 'nl'].includes(key.name)) {
//     for (let i = 0, len = data.length; i < len; i++) {
//       let el = data[i];
//       iterate({
//         data: el,
//         key: { name: i, type: toType(el), title: i },
//         route,
//         keys,
//       });
//     }
//   } else if (['fr', 'en', 'nl'].includes(key.name)) {
//     editor_data.push({ data, dataType: key.type, disabled: false, key, route, keys });
//   }
// };

// const parse = data => {
//   iterate({ data });

//   if (editor_search) {
//     editor_data = editor_data.filter(data => {
//       if (data.data.includes(editor_search)) {
//         return data;
//       } else if (toType(data.data) === 'array') {
//         let bool = false;
//         data.data.forEach(dataIn => {
//           if (dataIn.includes(editor_search)) {
//             bool = true;
//           }
//         });
//         if (bool) {
//           return data;
//         }
//       } else {
//         return null;
//       }
//     });
//   }

//   if (editor_edit) {
//     // editor_data[editor_edit.index].disabled = editor_edit.obj.disabled;
//     editor_data.forEach((el, i) => {
//       if (editor_edit.index !== i) {
//         el.disabled = true;
//       } else {
//         el.disabled = false;
//       }
//     });
//   } else {
//     editor_data.forEach(el => {
//       el.disabled = false;
//     });
//   }
// };

// const find = route => {
//   var properties = route.split('/');
//   var currentObj = data;
//   for (var i = 0; i < properties.length; i++) {
//     if (currentObj[properties[i]] !== undefined) {
//       currentObj = currentObj[properties[i]];
//     }
//   }
//   return {
//     data: currentObj,
//     disabled: false,
//     key: properties[properties.length - 1],
//     keys: properties,
//     route,
//   };
//   // editor_data.push({ data: currentObj, disabled: false, key: { name: '', title: '' } });
// };
