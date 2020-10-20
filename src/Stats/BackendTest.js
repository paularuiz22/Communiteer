import React, { Component, useState } from "react";
import { View, Text, Button, Alert, Image, Dimensions, ScrollView, TextInput, StyleSheet, Picker } from 'react-native';
import CheckBox from 'react-native-check-box';
import { ButtonGroup } from 'react-native-elements';
import * as firebase from 'firebase';
import { useForm } from 'react-hook-form';
import * as jobTypes from '../../jobTypes';

/* Implemented by Paula Ruiz for Sprint 3 of the Jelly Bellies' Communiteer project. This code is
 *  heavily based on the open source project, 'react-native-leaderboard' at https://github.com/JoeRoddy/react-native-leaderboard
 */


var config = {
    apiKey: "AIzaSyAOrcreYt99Sm5lthdeJZ2mlEQ7NxbjBDA",
    authDomain: "communiteer-2020fall.firebaseapp.com",
    databaseURL: "https://communiteer-2020fall.firebaseio.com/",
    storageBucket: "communiteer-2020fall.appspot.com"
};
const app = firebase.initializeApp(config);
const db = app.database();

type JobData = {
    requestor: string;
    jobType: string;
    date: string;
};

const ToDoItem = ({job: {job: title, /*requestorUserName, jobType, date, startTime, endTime, volunteer,*/ done}, id}) => {
  const [doneState, setDone] = useState(done);
  const onCheck = () => {
    setDone(!doneState);
       db.ref('/jobs').update({
          [id]: {
            job: title,
            done: !doneState,
          },
        });
  };

  return (
    <View style={styles.job}>
      <CheckBox
        checkBoxColor="skyblue"
        onClick={onCheck}
        isChecked={doneState}
        disabled={doneState}
      />
      <Text style={[styles.todoText, {opacity: doneState ? 0.2 : 1}]}>
        {title}
      </Text>
    </View>
  );
};


export default class LeaderBoard extends Component {
 // const { handleSubmit, register, setValue, errors } = useForm<JobData>();

  constructor() {
    super();
    this.state = {
      todos: {},
      presentToDo: '',
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.addNewTodo = this.addNewTodo.bind(this);
  }
  componentDidMount() {
    db.ref('/jobs').on('value', querySnapShot => {
      let data = querySnapShot.val() ? querySnapShot.val() : {};
      let jobs = {...data};
      this.setState({
        todos: jobs,
      });
    });
  }

  /*const onSubmit = (data: JobData) => {
    db.ref('/jobs').push(data);
  };*/

  addNewTodo() {
    db.ref('/jobs').push({
      done: false,
      job: this.state.presentToDo,
    });
    Alert.alert('Action!', 'A new To-do item was created');
    this.setState({
      presentToDo: '',
    });
  }
  clearTodos() {
    db.ref('/jobs').remove();
  }

  render() {
    let todosKeys = Object.keys(this.state.todos);
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainerStyle}>
        <View>
          {todosKeys.length > 0 ? (
            todosKeys.map(key => (
              <ToDoItem
                key={key}
                id={key}
                job={this.state.todos[key]}
              />
            ))
          ) : (
                <Text>No jobs</Text>
          )}
         </View>
        <TextInput
          placeholder="Add new job"
          value={this.state.presentToDo}
          style={styles.textInput}
          onChangeText={e => {
            this.setState({
              presentToDo: e,
            });
          }}
          onSubmitEditing = {this.addNewTodo}
        />
        <Button
          title="Add new job"
          onPress={this.addNewTodo}
          color="lightgreen"
        />
        <View style={{marginTop: 20}}>
          <Button title="Clear jobs" onPress={this.clearTodos} color="red" />
        </View>
      </ScrollView>
    );
  }
}

//TODO: function for assign volunteer
//TODO: multiple parts to form
//TODO: format dates

class JobsForm extends Component {

  constructor() {
    super();
    this.state = {
      todos: {},
      presentTitle: '',
      presentRequestor: '',
      presentDate: '',
      presentJobType: ''
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.addNewTodo = this.addNewTodo.bind(this);
  }

  componentDidMount() {
    db.ref('/jobs').on('value', querySnapShot => {
      let data = querySnapShot.val() ? querySnapShot.val() : {};
      let jobs = {...data};
      this.setState({
        todos: jobs,
      });
    });
  }

  addNewTodo() {
      db.ref('/jobs').push({
        done: false,
        title: this.state.presentTitle,
        requestor: this.state.presentRequestor,
        jobType: this.state.presentJobType,
        date: this.state.presentDate
      });
      Alert.alert('Action!', 'A new job was created');
      this.setState({
        presentTitle: '',
        presentRequestor: '',
        presentDate: '',
        presentJobType: ''
      });
    }

    clearTodos() {
      db.ref('/jobs').remove();
    }

      render() {
        let todosKeys = Object.keys(this.state.todos);
        return (
          <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainerStyle}>
            <View>
              {todosKeys.length > 0 ? (
                todosKeys.map(key => (
                  <ToDoItem
                    key={key}
                    id={key}
                    job={this.state.todos[key]}
                  />
                ))
              ) : (
                    <Text>No jobs</Text>
              )}
             </View>

            <TextInput
              placeholder="Job Title"
              value={this.state.presentTitle}
              style={styles.textInput}
              onChangeText={e => {
                this.setState({
                  presentTitle: e,
                });
              }}
              onSubmitEditing = {this.addNewTodo}
            />
            <Button
              title="Add new job"
              onPress={this.addNewTodo}
              color="lightgreen"
            />
            <View style={{marginTop: 20}}>
              <Button title="Clear jobs" onPress={this.clearTodos} color="red" />
            </View>
          </ScrollView>
        );
      }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainerStyle: {
    alignItems: 'center',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#afafaf',
    width: '80%',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 20,
    fontSize: 20,
  },
  job: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
  },
  todoText: {
    borderColor: '#afafaf',
    paddingHorizontal: 5,
    paddingVertical: 7,
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
    minWidth: '50%',
    textAlign: 'center',
  },
});