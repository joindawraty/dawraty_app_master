import React, {useState} from 'react';
import {Pressable, View} from 'react-native';
import Pdf from 'react-native-pdf';
import {useTranslation} from 'react-i18next';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import MetropolisMediumText from '../../components/Text/MetropolisSemiBoldText';

import {useLoading} from '../../context/Loading/LoadingContext';

import util from '../../util';
import colors from '../../components/color';
import {errorToast} from '../../util/toastUtils';

const PDFView = props => {
  const pdfLink = props?.route?.params?.link;
  const isDownloadable = props?.route?.params?.isDownloadable;

  const {t} = useTranslation();
  const safeAreaInsets = useSafeAreaInsets();

  const {setIsLoading} = useLoading();

  const [pageNumber, setPageNumber] = useState('');

  const onDownloadPressHandler = async () => {
    if (isDownloadable) {
      try {
        setIsLoading(true);
        await util.MethodUtils.downloadDocument(pdfLink);
        setIsLoading(false);
      } catch (err) {
        console.log('Error : ', err?.message);
        errorToast(t('alertMessage.wrong'));
        setIsLoading(false);
      }
    } else {
      errorToast(t('common.contentNotDownloadable'));
    }
  };

  return (
    <>
      <Pdf
        source={{uri: pdfLink}}
        // onLoadComplete={(pdfNumberOfPages, filePath) => {
        //   setNumberOfPages(pdfNumberOfPages);
        // }}
        trustAllCerts={false}
        onPageChanged={(page, numberOfPages) => {
          setPageNumber(
            t('dynamic', {
              en: `${page} ${t('course.of')} ${numberOfPages}`,
              ar: `${page} ${t('course.of')} ${numberOfPages}`,
            }),
          );
        }}
        onError={error => {
          if (error?.name !== 'ReactNativeBlobUtilCanceledFetch') {
            errorToast(t('alertMessage.wrong'));
          }
        }}
        onPressLink={uri => {
          console.log(`Link pressed: ${uri}`);
        }}
        style={{
          flex: 1,
        }}
      />
      {pageNumber && isDownloadable ? (
        <Pressable
          onPress={onDownloadPressHandler}
          style={{
            position: 'absolute',
            bottom: safeAreaInsets.bottom + 30,
            left: safeAreaInsets.left + 30,
            paddingVertical: 15,
            paddingHorizontal: 30,
            backgroundColor: colors.blue,
            borderRadius: 30,
            opacity: 0.7,
          }}>
          <MetropolisMediumText style={{color: colors.white}}>
            {t('course.downloadDocument')}
          </MetropolisMediumText>
        </Pressable>
      ) : null}
      {pageNumber ? (
        <View
          style={{
            position: 'absolute',
            bottom: safeAreaInsets.bottom + 30,
            right: safeAreaInsets.right + 30,
            paddingVertical: 15,
            paddingHorizontal: 30,
            backgroundColor: colors.blue,
            borderRadius: 30,
            opacity: 0.7,
          }}>
          <MetropolisMediumText style={{color: colors.white}}>
            {pageNumber}
          </MetropolisMediumText>
        </View>
      ) : null}
    </>
  );
};

export default PDFView;
