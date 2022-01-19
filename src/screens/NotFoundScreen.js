import * as React from 'react';
import Caption from 'components/Caption';
import Section from 'components/Section';
import { ScreenWrapper } from 'styles/global';

const NotFoundScreen = ({ navigation }) => {
  return (
    <ScreenWrapper>
      <Section
        height={500}
        justifyContent="center"
        alignItems="center"
        left={20}
        right={20}>
        <Caption size={18}>Page under construction.</Caption>
      </Section>
    </ScreenWrapper>
  );
};

export default NotFoundScreen;
