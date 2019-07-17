import React, { useEffect } from 'react';
import { axiosServer } from '../../shared/axios_instances/axios_instances';
import qs from 'qs';
import iGoatThis from '../../images/igoatthis.jpg';

export default props => {
  useEffect(() => {
    const query = props.location.search.replace('?', '');
    const token = qs.parse(query).token;
    setTimeout(() => {
      axiosServer.post('/confirm-email', { verificationToken: token }).then(() => {
        props.history.push('/');
      });
    }, 1000);
    return props.history.push('/');
  });
  return (
    <div
      className="confirm"
      style={{
        backgroundImage: `url("${iGoatThis}")`,
      }}
    />
  );
};
