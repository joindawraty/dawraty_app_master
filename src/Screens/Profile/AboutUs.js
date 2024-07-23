// import React from 'react';
// import {Dimensions, FlatList, Image, View} from 'react-native';
// import {useTranslation} from 'react-i18next';

// import MetropolisSemiBoldText from '../../components/Text/MetropolisSemiBoldText';
// import MetropolisRegularText from '../../components/Text/MetropolisRegularText';

// import color from '../../components/color';

// const data = [
//   {
//     id: 0,
//     image: require('../../assets/images/aboutUs/Salman-Al-Otaibi.png'),
//     name: 'aboutUs.teams.person1.name',
//     bio: 'aboutUs.teams.person1.bio',
//   },
//   {
//     id: 4,
//     image: require('../../assets/images/aboutUs/Yousef-Al-Rumaih.png'),
//     name: 'aboutUs.teams.person3.name',
//     bio: 'aboutUs.teams.person3.bio',
//   },
//   {
//     id: 3,
//     image: require('../../assets/images/aboutUs/Janine-Dougherty.png'),
//     name: 'aboutUs.teams.person4.name',
//     bio: 'aboutUs.teams.person4.bio',
//   },
//   {
//     id: 4,
//     image: require('../../assets/images/aboutUs/Khalid-Al-Rajhi.png'),
//     name: 'aboutUs.teams.person5.name',
//     bio: 'aboutUs.teams.person5.bio',
//   },
//   {
//     id: 5,
//     image: require('../../assets/images/aboutUs/Yousef-Alsalem.png'),
//     name: 'aboutUs.teams.person6.name',
//     bio: 'aboutUs.teams.person6.bio',
//   },
//   {
//     id: 2,
//     image: require('../../assets/images/aboutUs/img_aldanah_dougherty.png'),
//     name: 'aboutUs.teams.person7.name',
//     bio: 'aboutUs.teams.person7.bio',
//   },
// ];

// const AboutUs = props => {
//   const {t} = useTranslation();

//   const renderInstructorAbout = ({item}) => {
//     const {image, name, bio} = item;
//     return (
//       <View
//         style={{
//           width: Dimensions.get('window').width / 2 - 20,
//           shadowColor: '#000',
//           shadowOffset: {
//             width: 0,
//             height: 2,
//           },
//           shadowOpacity: 0.25,
//           shadowRadius: 3.84,

//           elevation: 5,
//           backgroundColor: color.white,
//           marginBottom: 10,
//           marginLeft: 10,
//           padding: 14,

//           borderRadius: 10,
//         }}>
//         <Image
//           source={image}
//           style={{height: 80, width: 80, alignSelf: 'center'}}
//           resizeMode="cover"
//         />
//         <MetropolisSemiBoldText style={{textAlign: 'center', marginBottom: 14}}>
//           {t(name)}
//         </MetropolisSemiBoldText>
//         <MetropolisRegularText style={{textAlign: 'center'}}>
//           {t(bio)}
//         </MetropolisRegularText>
//       </View>
//     );
//   };

//   return (
//     <View
//       style={{
//         flex: 1,
//         backgroundColor: color.white,
//         // paddingHorizontal: 16,
//       }}>
//       <FlatList
//         data={data}
//         renderItem={renderInstructorAbout}
//         keyExtractor={item => item.id}
//         numColumns={2}
//         ListHeaderComponent={() => {
//           return (
//             <View style={{paddingHorizontal: 16}}>
//               <MetropolisSemiBoldText
//                 style={{fontSize: 16, marginBottom: 14, textAlign: 'center'}}>
//                 {t('aboutUs.learnWithUs')}
//               </MetropolisSemiBoldText>
//               <MetropolisRegularText
//                 style={{fontSize: 14, textAlign: 'center', marginBottom: 14}}>
//                 {t('aboutUs.welcomeMessage')}
//               </MetropolisRegularText>
//               <MetropolisSemiBoldText
//                 style={{fontSize: 16, marginBottom: 14, textAlign: 'center'}}>
//                 {t('aboutUs.teamTitle')}
//               </MetropolisSemiBoldText>
//             </View>
//           );
//         }}
//       />
//     </View>
//   );
// };

// export default AboutUs;

import React, {useEffect, useRef, useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import WebView from 'react-native-webview';
import {useTranslation} from 'react-i18next';

import color from '../../components/color';

const AboutUs = props => {
  const webViewRef = useRef(null);
  const {i18n} = useTranslation();

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    webViewRef.current.injectJavaScript(`
      try {
        const clickEvent = new MouseEvent("click", {view: window, bubbles: true, cancelable: false});
        const elements = document.getElementsByClassName(
          ${i18n.language === 'ar'} ? 'lng-button right' : 'lng-button'
        )
        if (elements?.length) {
          elements[0].dispatchEvent(clickEvent)
        }
      } catch (err) {
        console.log('change language Error : ', err)
      }
      true;
    `);
  }, [i18n.language]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: color.white,
      }}>
      <WebView
        source={{
          uri: 'https://www.dawratycourses.com/about-us',
        }}
        ref={webViewRef}
        startInLoadingState
        renderLoading={() => {
          return (
            <View
              style={{
                position: 'absolute',
                alignSelf: 'center',
              }}>
              <ActivityIndicator size={'large'} color={color.black} />
            </View>
          );
        }}
        incognito
        style={{
          flex: loaded ? 1 : 0,
        }}
        onLoadEnd={() => {
          setTimeout(() => {
            setLoaded(true);
          }, 100);
          webViewRef.current.injectJavaScript(
            `
              setTimeout(() => {
                const header = document.querySelector('header')
                header.style.display='none'
                const topSection = document.getElementsByClassName('about-section')[0]
                topSection.style.display='none'
                const footer = document.querySelector('footer')
                footer.style.display='none'
                if (${i18n.language === 'ar'}) {
                  try {
                    const clickEvent = new MouseEvent("click", {view: window, bubbles: true, cancelable: false});
                    const elements = document.getElementsByClassName('lng-button right')
                    if (elements?.length) {
                      elements[0].dispatchEvent(clickEvent)
                    }
                  } catch (err) {
                    console.log('change language Error : ', err)
                  }
                }
                true;
              }, 100);
              true;
            `,
          );
        }}
      />
    </View>
  );
};

export default AboutUs;
