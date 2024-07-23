import React from 'react';
import {useState, useEffect, useContext, useRef} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
  ActivityIndicator,
  Modal,
  Alert,
  Button,
  useWindowDimensions,
  I18nManager,
  Animated,
  ImageBackground,
} from 'react-native';
import {OpenAI} from 'openai';
import Ionicons from 'react-native-vector-icons/Ionicons';
import useStudentCourses from '../../hooks/useStudentCourses';
import useCourses from '../../hooks/useCourses';
import DropDownPicker from 'react-native-dropdown-picker';
import useStudentThreads from '../../hooks/useStudentThreads';
import useFlashcards from '../../hooks/useFlashcards';
import {updateThreads} from '../../services/course';
import {useTranslation} from 'react-i18next';
import {OPENAI_API_KEY, OPENAI_FLASHCARD_ASSISTANT_KEY} from '@env';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
  organization: 'org-01R0D2QUB22GBW5gpl4mMFmY',
});

const availableCourses = [
  // 1, // demo course - needs to be deleted after testing
  23, 57,
];

const availableChapters = [
  // 1, // demo chapters - need to be deleted after testing
  // 2,
  // 3,
  // 4,
  61, // biostats
  62,
  63,
  64,
  80,
  65,
  66,
  67,
  68,
  81,
  464,
  389, // biology
  390,
  391,
  392,
  393,
  396,
];

function Flashcard(props) {
  const {question, answer, id, isHorizontal, isLandscapeMode} = props;
  const [flipAnim] = useState(new Animated.Value(0));
  const [displayText, setDisplayText] = useState(true);
  const [backgroundColor, setBackgroundColor] = useState('#0b4475');
  const [cardIsFlipped, setCardIsFlipped] = useState(false);
  const {width, height} = useWindowDimensions();

  const startFlipAnimation = () => {
    setDisplayText(false);

    Animated.timing(flipAnim, {
      toValue: cardIsFlipped ? 0 : 180, // Rotate from 0 to 180 degrees if not flipped, else from 180 to 0
      duration: 500, // Animation duration
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      if (backgroundColor == '#0b4475') {
        setBackgroundColor('white');
      } else {
        setBackgroundColor('#0b4475');
      }

      setDisplayText(true);
    }, 300);
  };

  const interpolatedFlip = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <Pressable
      onPress={() => {
        setCardIsFlipped(!cardIsFlipped);
        startFlipAnimation();
      }}>
      <Animated.View
        style={[
          styles.flashcard,
          {backgroundColor: backgroundColor},
          {transform: [{rotateY: interpolatedFlip}]},
          isHorizontal ? {marginLeft: 20, marginRight: 20} : null,
          isLandscapeMode ? {width: 400} : {width: 400},
          width <= 400 && !isLandscapeMode ? {width: 350} : {},
        ]}>
        {displayText ? (
          <View
            style={[
              styles.flashcard_dawraty,
              cardIsFlipped
                ? {backgroundColor: '#0b4475'}
                : {backgroundColor: 'rgba(255, 255, 255, 0.8)'},
            ]}>
            <Text
              style={[
                {
                  textAlign: 'center',
                  fontWeight: 'bold',
                  letterSpacing: 8,
                  fontSize: 15,
                },
                !cardIsFlipped
                  ? {color: '#0b4475'}
                  : {
                      color: 'rgba(255, 255, 255, 0.8)',
                      transform: [{rotateY: '180deg'}],
                    },
              ]}>
              DAWRATY
            </Text>
          </View>
        ) : null}
        {cardIsFlipped ? (
          displayText ? (
            <View>
              <Text
                style={[
                  styles.flashcard_text,
                  {
                    color: '#0b4475',
                    fontWeight: 'bold',
                    marginBottom: 5,
                    paddingLeft: 10,
                    paddingRight: 10,
                  },
                  cardIsFlipped ? {transform: [{rotateY: '180deg'}]} : null,
                ]}>
                Q. {question}
              </Text>
              <Text
                style={[
                  styles.flashcard_text,
                  {color: '#0b4475', paddingLeft: 10, paddingRight: 10},
                  answer.length > 400 ? {fontSize: 9} : null,
                  cardIsFlipped ? {transform: [{rotateY: '180deg'}]} : null,
                ]}>
                A. {answer}
              </Text>
            </View>
          ) : null
        ) : displayText ? (
          <Text style={[styles.flashcard_text, {fontWeight: 'bold'}]}>
            {question}
          </Text>
        ) : null}
      </Animated.View>
    </Pressable>
  );
}

function Flashcards() {
  const {t} = useTranslation();
  const {
    i18n: {language},
  } = useTranslation();

  const {isLoading, courses, refresh} = useStudentCourses();
  const {
    isLoading: purchasedLoading,
    courses: purchasedCourses,
    refresh: purchasedRefresh,
  } = useCourses();
  const {
    isLoading: threadsLoading,
    threads,
    refresh: threadsRefresh,
  } = useStudentThreads();
  // const {isLoading: flashcardsLoading, flashcards: db_flashcards, refresh: flashcardsRefresh} = useFlashcards();

  const {width, height} = useWindowDimensions();
  const isLandscapeMode = width > height ? true : false;

  const [listMode, setListMode] = useState(false);
  const [lockout, setLockout] = useState(false);
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [studentCourses, setStudentCourses] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [error, setError] = useState(false);
  const [threadID, setThreadID] = useState('');
  const [assistant, setAssistant] = useState({});
  const [coursesAvailable, setCoursesAvailable] = useState(true);

  let lastScrolled = 0;
  let scrollTo = width <= 400 && !isLandscapeMode ? 390 : 440;
  const scrollViewRef = useRef();
  let fullyPurchasedCourses = [];

  useEffect(() => {
    scrollToChild(0);
    lastScrolled = 0;
  }, [isLandscapeMode]);

  useEffect(() => {
    let setter = [];

    if (studentCourses.length > 0) {
      setter = studentCourses;
    }

    if (purchasedCourses.length > 0) {
      for (let i = 0; i < purchasedCourses.length; i++) {
        if (availableCourses.includes(purchasedCourses[i].id)) {
          if (purchasedCourses[i].is_purchased?.is_purchased == true) {
            let course_name = purchasedCourses[i].description;
            course_name = course_name.replace('<p>', '');
            course_name = course_name.replace('</p>', '');
            let course_name_translation;
            if (purchasedCourses[i].translation.length > 0) {
              for (let x = 0; x < purchasedCourses[i].translation.length; x++) {
                if (purchasedCourses[i].translation[x].variable == 'name') {
                  course_name_translation =
                    purchasedCourses[i].translation[x].value;
                }
              }
            }
            fullyPurchasedCourses.push(purchasedCourses[i].id);
            setter.push({
              label:
                language == 'ar'
                  ? `${course_name_translation} - ${t('common.all')}`
                  : `${course_name} - ${t('common.all')}`,
              value: {
                course_id: purchasedCourses[i].id,
                course_name: course_name,
                isCourse: true,
              },
            });
          }
        }
      }
      setter.sort(function (x, y) {
        return x.value.isCourse === y.value.isCourse ? 0 : x ? -1 : 1;
      });
      setter.sort((a, b) => a.value.course_id - b.value.course_id);
      setStudentCourses(setter);
    }
  }, [purchasedLoading]);

  useEffect(() => {
    if (!isLoading) {
      let setter = [];

      if (studentCourses.length > 0) {
        setter = studentCourses;
      }

      if (courses.length > 0) {
        for (let i = 0; i < courses.length; i++) {
          if (courses[i].courses.chapter.length > 0) {
            for (let x = 0; x < courses[i].courses.chapter.length; x++) {
              if (
                availableChapters.includes(courses[i].courses.chapter[x].id)
              ) {
                setter.push({
                  label: `${courses[i].courses.chapter[x].name} - ${courses[i].courses.name} Chapter`,
                  value: {
                    course_id: courses[i].course_id,
                    course_name: courses[i].courses.name,
                    chapter_id: courses[i].courses.chapter[x].id,
                    chapter_name: courses[i].courses.chapter[x].name,
                    isCourse: false,
                  },
                });
              }
            }
          }
        }
        setter.sort(function (x, y) {
          return x.value.isCourse === y.value.isCourse ? 0 : x ? -1 : 1;
        });
        setter.sort((a, b) => a.value.course_id - b.value.course_id);
        setStudentCourses(setter);
      }

      if (setter.length <= 0) {
        setCoursesAvailable(false);
      }
    }
  }, [isLoading]);

  useEffect(() => {
    openai.beta.assistants
      .retrieve(process.env.OPENAI_FLASHCARD_ASSISTANT_KEY)
      .then(res => setAssistant(res))
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    if (flashcards.length > 0) {
      setFlashcards([]);
    }

    if (selectedCourse != null) {
      createMessage();
    }
  }, [selectedCourse]);

  useEffect(() => {
    if (threads.length > 0 && threads[0].flashcards_thread != '') {
      setThreadID(threads[0].flashcards_thread);
    } else {
      openai.beta.threads.create().then(res => {
        setThreadID(res.id);
        updateThreads({
          thread_id: res.id,
          to_update: 'flashcards_thread',
        });
      });
    }
  }, [threadsLoading]);

  // useEffect(() => {
  //     let setter = []
  //     for (let i = 0; i < db_flashcards.length; i++)
  //     {
  //         setter.push({question: db_flashcards[i].question, answer: db_flashcards[i].answer, course_id: db_flashcards[i].course_id})
  //     }
  //     setDbFlashcards(setter)
  // }, [flashcardsLoading])

  function nextCard() {
    if (lastScrolled != scrollTo * (flashcards.length - 1)) {
      scrollToChild(lastScrolled + scrollTo);
      lastScrolled = lastScrolled + scrollTo;
    }
  }

  function prevCard() {
    if (lastScrolled >= scrollTo) {
      scrollToChild(lastScrolled - scrollTo);
      lastScrolled = lastScrolled - scrollTo;
    }
  }

  function generateFlashcards(array) {
    let setter = flashcards;

    if (array[0].question.length > 1) {
      array.map(flashcard =>
        setter.push({
          question: flashcard.question,
          answer: flashcard.answer,
        }),
      );
    }

    if (array[0].question2.length > 1) {
      array.map(flashcard =>
        setter.push({
          question: flashcard.question2,
          answer: flashcard.answer2,
        }),
      );
    }

    if (array[0].question3.length > 1) {
      array.map(flashcard =>
        setter.push({
          question: flashcard.question3,
          answer: flashcard.answer3,
        }),
      );
    }

    if (array[0].question4.length > 1) {
      array.map(flashcard =>
        setter.push({
          question: flashcard.question4,
          answer: flashcard.answer4,
        }),
      );
    }

    if (array[0].question5.length > 1) {
      array.map(flashcard =>
        setter.push({
          question: flashcard.question5,
          answer: flashcard.answer5,
        }),
      );
    }
    setFlashcards(setter);
    setLoading(false);
    setLockout(false);
  }

  async function createMessage() {
    openai.beta.threads.runs
      .list(threadID)
      .then(res1 => {
        if (res1.body.first_id == null) {
          openai.beta.threads.messages
            .create(threadID, {
              role: 'user',
              content: `generate me five new and distinct flashcards to help me study the content of ${
                selectedCourse.chapter_name != undefined
                  ? selectedCourse.chapter_name
                  : selectedCourse.course_name
              }.`,
            })
            .then(res => {
              runAssistant();
              setLoading(true);
            })
            .catch(err => console.log(err));
        } else {
          openai.beta.threads.runs
            .retrieve(threadID, res1.body.first_id)
            .then(res => {
              if (res.status == 'requires_action') {
                submitTools(res1.body.first_id);
                setError(false);
              } else if (
                res.status == 'completed' ||
                res.status == 'expired' ||
                res.status == 'failed'
              ) {
                setError(false);
                openai.beta.threads.messages
                  .create(threadID, {
                    role: 'user',
                    content: `generate me five new and distinct flashcards to help me study the content of ${
                      selectedCourse.chapter_name != undefined
                        ? selectedCourse.chapter_name
                        : selectedCourse.course_name
                    }.`,
                  })
                  .then(res => {
                    runAssistant();
                    setLoading(true);
                  })
                  .catch(err => console.log(err));
              } else {
                setLockout(true);
                setError(true);
                setTimeout(() => {
                  setLockout(false);
                  createMessage();
                  console.log('locking loop');
                  console.log(res.status);
                }, 5000);
              }
            })
            .catch(err => console.log('error'));
        }
      })
      .catch(err => console.log('error'));
  }

  async function runAssistant() {
    setLoading(true);
    openai.beta.threads.runs
      .create(threadID, {
        assistant_id: assistant.id,
      })
      .then(res => {
        setLoading(true);
        retrieveRun(res.id);
      });
  }

  function retrieveRun(run_id) {
    openai.beta.threads.runs.retrieve(threadID, run_id).then(res => {
      if (res.status == 'in_progress' || res.status == 'queued') {
        setLoading(true);
        setTimeout(() => {
          retrieveRun(run_id);
          console.log('running');
        }, 6000);
      } else if (res.status == 'requires_action') {
        submitTools(run_id);
      } else if (res.status == 'completed') {
        setLockout(true);
        setTimeout(() => {
          setLockout(false);
        }, 20000);
        setError(true);
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  }

  async function submitTools(run_id) {
    setLoading(true);

    const runStatus = await openai.beta.threads.runs.retrieve(threadID, run_id);

    const toolCalls = runStatus.required_action.submit_tool_outputs.tool_calls;

    const args = [];
    toolCalls.map(tool => args.push(JSON.parse(tool.function.arguments)));
    const toolIds = [];
    const outputs = [];

    toolCalls.map(tool => toolIds.push(tool.id));
    toolIds.map(toolID =>
      outputs.push({
        tool_call_id: toolID,
        output: 'output',
      }),
    );

    openai.beta.threads.runs
      .submitToolOutputs(threadID, run_id, {
        tool_outputs: outputs,
      })
      .then(res => generateFlashcards.apply(null, [args]));
  }

  async function fetchMessages() {
    const messages = await openai.beta.threads.messages.list(threadID);
    console.log(messages.body.data);
  }

  const scrollToChild = offsetX => {
    scrollViewRef.current?.scrollTo({x: offsetX});
  };

  return (
    <SafeAreaView style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        supportedOrientations={['portrait', 'landscape']}
        visible={showModal}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setShowModal(!showModal);
        }}>
        <View style={styles.centeredView}>
          <View style={[styles.modalView, openDropdown && {height: '60%'}]}>
            <Pressable
              style={styles.closeButton}
              onPress={() => setShowModal(!showModal)}>
              <Ionicons name="close" size={24} color="black" />
            </Pressable>
            {studentCourses.length > 0 ? (
              <DropDownPicker
                items={studentCourses}
                setItems={setStudentCourses}
                arrowColor={'black'}
                textStyle={{color: 'black'}}
                arrowSize={10}
                open={openDropdown}
                setOpen={setOpenDropdown}
                value={selectedCourse}
                setValue={setSelectedCourse}
                placeholder={t('flashcards.selectCourse')}
                onChangeValue={() => setShowModal(false)}
                placeholderTextColor={'#CACACA'}
                listMode="SCROLLVIEW"
                searchable={true}
                language={language == 'ar' ? 'AR' : 'EN'}
                dropDownContainerStyle={{
                  maxHeight: 300,
                  borderColor: 'grey',
                  borderWidth: 1,
                }}
                scrollViewProps={{
                  nestedScrollEnabled: true,
                  showsVerticalScrollIndicator: true,
                }}
                renderListItem={props => (
                  <View
                    style={{
                      padding: 10,
                      margin: 5,
                      borderColor: 'grey',
                      borderWidth: 1,
                      borderRadius: 5,
                      backgroundColor: '#f0f0f0',
                    }}
                    onTouchEnd={() => {
                      setSelectedCourse(props.value);
                      setOpenDropdown(false);
                    }}>
                    <Text style={{color: 'black'}}>{props.label}</Text>
                  </View>
                )}
              />
            ) : coursesAvailable ? (
              <ActivityIndicator
                style={{marginTop: 15, marginBottom: 15}}
                size="large"
                color="#0b4475"
              />
            ) : (
              <Text style={{color: 'red'}}>No Courses Available</Text>
            )}
          </View>
        </View>
      </Modal>

      <View
        style={{
          display: 'flex',
          flexDirection: isLandscapeMode ? 'row' : 'column',
          alignItems: 'center',
        }}>
        <View
          style={
            isLandscapeMode
              ? {display: 'flex', flex: 1, alignItems: 'center'}
              : {alignItems: 'center'}
          }>
          <Pressable onPress={() => setShowModal(true)} style={styles.button}>
            <Text style={styles.button_text}>
              ⚙️ {t('flashcards.selectCourse')}
            </Text>
          </Pressable>
          {selectedCourse == null ? null : (
            <Text
              style={{
                color: '#0b4475',
                textAlign: 'center',
                fontWeight: 'bold',
                borderWidth: 1,
                padding: 5,
                borderRadius: 5,
              }}>
              Selected:{' '}
              {selectedCourse.chapter_name != undefined
                ? selectedCourse.chapter_name
                : selectedCourse.course_name}
            </Text>
          )}
          {loading && flashcards.length > 0 ? (
            <ActivityIndicator
              style={{marginTop: 15, marginBottom: 15}}
              size="large"
              color="#0b4475"
            />
          ) : (
            <Pressable
              onPress={() => createMessage()}
              style={
                selectedCourse == null || lockout
                  ? styles.buttonDisabled
                  : styles.button
              }
              disabled={selectedCourse == null || lockout ? true : false}>
              <Text style={styles.button_text}>
                💡 {t('flashcards.generateFlashcards')}
              </Text>
            </Pressable>
          )}

          <View style={{display: 'flex', alignItems: 'center'}}>
            <Text style={styles.view_mode_text}>
              {t('flashcards.viewMode')}
            </Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Pressable
                onPress={() => {
                  setListMode(false);
                }}>
                <Ionicons
                  style={{marginLeft: 5, marginRight: 5}}
                  name={'easel-outline'}
                  size={40}
                  color={'#0b4475'}
                />
              </Pressable>
              <Pressable
                onPress={() => {
                  setListMode(true);
                }}>
                <Ionicons
                  style={{marginLeft: 5, marginRight: 5}}
                  name={'grid-outline'}
                  size={35}
                  color={'#0b4475'}
                />
              </Pressable>
            </View>
          </View>

          {flashcards.length > 0 && !loading ? (
            <Pressable style={styles.generate_more} onPress={createMessage}>
              <Text style={styles.generate_more_text}>
                {t('flashcards.generateMore')}
              </Text>
            </Pressable>
          ) : null}
        </View>

        {error ? (
          <View>
            <Text style={{textAlign: 'center', color: 'red', marginTop: 20}}>
              Currently unable to generate more cards
            </Text>
            <Text style={{textAlign: 'center', color: 'red'}}>
              Please wait before trying again...
            </Text>
          </View>
        ) : null}
        {/* <Button title='test' onPress={() => fetchMessages()}/> */}

        {flashcards.length > 0 && !listMode ? (
          <View
            style={[
              {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: 440,
              },
              width <= 400 && !isLandscapeMode ? {width: 390} : {},
            ]}>
            <ScrollView ref={scrollViewRef} horizontal={true}>
              {flashcards.map((flashcard, key) => (
                <Flashcard
                  key={key}
                  question={flashcard.question}
                  answer={flashcard.answer}
                  id={key}
                  isHorizontal={true}
                  isLandscapeMode={isLandscapeMode}
                />
              ))}
            </ScrollView>

            <View style={[{display: 'flex', flexDirection: 'row'}]}>
              <Pressable style={styles.back_button} onPress={prevCard}>
                <Text style={styles.back_button_text}>
                  {t('flashcards.back')}
                </Text>
              </Pressable>

              <Pressable style={styles.next_button} onPress={nextCard}>
                <Text style={styles.next_button_text}>
                  {t('flashcards.next')}
                </Text>
              </Pressable>
            </View>
          </View>
        ) : null}

        {flashcards.length > 0 && listMode ? (
          <ScrollView style={{flex: 1}}>
            {flashcards.map((flashcard, key) => (
              <Flashcard
                key={key}
                question={flashcard.question}
                answer={flashcard.answer}
                id={key}
                isHorizontal={false}
                isLandscapeMode={isLandscapeMode}
              />
            ))}
          </ScrollView>
        ) : null}

        {loading && flashcards.length <= 0 ? (
          <ActivityIndicator style={{flex: 2}} size="large" color="#0b4475" />
        ) : null}

        {flashcards.length <= 0 && !loading ? (
          <View style={styles.logo_container}>
            <Image
              source={require('../../assets/images/logo.png')}
              style={styles.logo}
            />
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: '#0b4475',
                marginLeft: 10,
              }}>
              <Text style={styles.logo_text}>DAWRATY</Text>
            </View>

            <Text style={styles.logo_subtext}>
              {t('flashcards.introText1')}
            </Text>
            <Text style={styles.logo_subtext}>
              {t('flashcards.introText2')}
            </Text>
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 150,
    resizeMode: 'center',
    objectFit: 'scale-down',
  },
  logo_container: {
    display: 'flex',
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo_text: {
    fontWeight: 'bold',
    fontSize: 20,
    letterSpacing: 5,
    color: '#0b4475',
    marginLeft: 7,
  },
  logo_subtext: {
    marginTop: 10,
    color: '#0b4475',
    fontSize: 15,
    textAlign: 'center',
  },
  view_mode_text: {
    color: '#0b4475',
    fontWeight: 'bold',
    fontSize: 20,
  },
  button: {
    borderWidth: 1,
    borderColor: '#0b4475',
    backgroundColor: '#0b4475',
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    padding: 10,
    width: 200,
    marginLeft: 'auto',
    marginRight: 'auto',
    height: 40,
  },
  buttonDisabled: {
    borderWidth: 1,
    borderColor: 'grey',
    backgroundColor: 'grey',
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    padding: 10,
    width: 200,
    marginLeft: 'auto',
    marginRight: 'auto',
    height: 40,
  },
  button_text: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  flashcard: {
    borderRadius: 8,
    backgroundColor: '#0b4475',
    height: 250,
    width: 300,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  flashcard_text: {
    color: 'white',
    // fontWeight: 'bold',
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  flashcard_logo: {
    height: 35,
    width: 35,
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 50,
    resizeMode: 'contain',
    top: '80%',
    left: '87%',
  },
  flashcard_dawraty: {
    position: 'absolute',
    top: 0,
    width: '100%',
    paddingTop: 10,
    paddingBottom: 10,
    letterSpacing: 4,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  back_button: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: '#0b4475',
    borderRadius: 8,
    padding: 5,
  },
  next_button: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: '#0b4475',
    borderRadius: 8,
    padding: 5,
  },
  generate_more: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: '#0b4475',
    borderRadius: 8,
    padding: 5,
    width: 170,
  },
  generate_more_text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  back_button_text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  next_button_text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default Flashcards;
