import React, {useState, useEffect} from 'react';
import {InteractionManager} from 'react-native';
import {View} from 'react-native-ui-lib';
import {PlaceholderMedia, Placeholder, Shine, Fade} from 'rn-placeholder';

const AfterInteraction = ({
  disableAnimation,
  fade,
  children,
  skeleton,
  forceShow,
  ...props
}: any) => {
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFinished(true);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      setFinished(true);
    });
  }, []);

  const defaultSkeleton = () => (
    <Placeholder
      // @ts-expect-error
      Animation={fade ? Fade : Shine}>
      <PlaceholderMedia
        isRound={false}
        style={{height: '100%', width: '100%'}}
      />
    </Placeholder>
  );

  const renderSkeleton = () =>
    skeleton || (!disableAnimation && defaultSkeleton());

  return (
    <View flex {...props}>
      {(finished && !forceShow && children) || renderSkeleton()}
    </View>
  );
};

export default AfterInteraction;
