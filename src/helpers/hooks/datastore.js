import { useEffect, useState } from 'react';
import * as R from 'ramda';
import { Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { getCurrentDay, isPresent } from 'utils/global';

const excludedFields = [
  'id',
  'createdAt',
  'updatedAt',
  'owner',
  '_version',
  '_lastChangedAt',
  '_deleted',
];

// export const useSyncList = ({ model, filter = () => true }) => {
//   const [list, setList] = useState([]);

//   const getList = async () => {
//     const data = (await DataStore.query(model)).filter(filter);

//     setList(data);
//   };

//   useEffect(() => {
//     getList();
//     const subscription = DataStore.observe(model).subscribe(message =>
//       getList(message),
//     );

//     return () => subscription.unsubscribe();
//   }, []);

//   return list;
// };

// export const useSyncEntity = (model, id, defaultState) => {
//   const [entity, setEntity] = useState(defaultState);

//   if (!id)
//     return {
//       entity,
//       setEntity,
//     };

//   const getEntity = async () => {
//     const data = await DataStore.query(model, id);

//     setEntity(data);
//   };

//   useEffect(() => {
//     getEntity();
//     const subscription = DataStore.observe(model, id).subscribe(() =>
//       getEntity(),
//     );

//     return () => subscription.unsubscribe();
//   }, []);

//   return {
//     entity,
//     setEntity,
//   };
// };

// export const useSyncActions = () => {
//   const [isLoading, setLoading] = useState(false);
//   const { t } = useTranslation();

//   const syncAction = async (data, Model) => {
//     setLoading(true);
//     if (data.id) {
//       const original = await DataStore.query(Model, data.id);

//       const result = await DataStore.save(
//         Model.copyOf(original, updated => {
//           const updatingFields = R.without(excludedFields, R.keys(data));

//           updatingFields.forEach(field => {
//             updated[field] = data[field];
//           });
//         }),
//       );
//       setLoading(false);
//       return result;
//     }

//     const owner = await Auth.currentAuthenticatedUser();

//     const result = await DataStore.save(
//       new Model({
//         ...data,
//         owner: owner.attributes.sub,
//         createdDay: getCurrentDay(),
//       }),
//     );
//     setLoading(false);

//     return result;
//   };

//   const removeHandler = async (id, Model) => {
//     setLoading(true);

//     const todelete = await DataStore.query(Model, id);
//     await DataStore.delete(todelete);

//     setLoading(false);
//   };

//   const removeAction = (id, Model, afterRemove) =>
//     Alert.alert(t('modal.removeTitle'), '', [
//       {
//         text: t('common.no'),
//         style: 'cancel',
//       },
//       {
//         text: t('common.yes'),
//         onPress: async () => {
//           await removeHandler(id, Model), afterRemove();
//         },
//       },
//     ]);

//   return {
//     syncAction,
//     removeAction,
//     isLoading,
//   };
// };

// export const isFieldValueUniq = async (field, value, model) => {
//   const todayDate = getCurrentDay();
//   const entity = await DataStore.query(model, c =>
//     c.createdDay('eq', todayDate)[field]('eq', value),
//   );

//   return isPresent(entity);
// };
