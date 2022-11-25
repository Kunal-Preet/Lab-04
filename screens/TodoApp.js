import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Constants from 'expo-constants';

// You can import from local files
import Spacer from '../components/Spacer';
import ButtonIcon from '../components/ButtonIcon';

// or any pure javascript modules available in npm
import { Title, Paragraph, Card, Button, TextInput } from 'react-native-paper';
import { FontAwesome as Icon } from '@expo/vector-icons';

// Import Redux and React Redux Dependencies
import { connect } from 'react-redux';
import { addTodo,addAsignee, deleteTodo } from '../redux/actions';

// Test Data
// const data = [
//   {id: 1, task: "Do this stuff"},
//   {id: 2, task: "Do another stuff"},
// ]

const TodoApp = ({ todo_list,addAsignee,addTodo, deleteTodo }) => {
  const [task, setTask] = React.useState('');
  const [asignee, setAsignee] = React.useState('');

  const handleAddTodo = () => {
    addTodo(task),
    addAsignee(asignee)
    setTask('')
    setAsignee('')
  }

  const handleDeleteTodo = (id) => {
    deleteTodo(id)
  }

  return (
    <View style={styles.container}>
      <Card title="Card Title">
        <Text style={styles.paragraph}>ToDo App with React Native and Redux</Text>
      </Card>
      <Spacer />
      <Card>
        <Card.Content>
          <Title>Add ToDo Here</Title>
          
          <TextInput
            mode="outlined"
            label="Task"
            value={task}
            onChangeText={task => setTask(task)}
          />
          <TextInput
            mode="outlined"
            label="Asignee"
            value={asignee}
            onChangeText={asignee => setAsignee(asignee)}
          />
          <Spacer/>
          <Button mode="contained" onPress={handleAddTodo}>
            Add Task
          </Button>
        </Card.Content>
      </Card>
      <Spacer />
      <FlatList
        data={todo_list}
        keyExtractor={(item) => item.id}
        renderItem={({item, index}) => {
          return (
            <>
            <Card>
              <Card.Title
                title={`Task#${item.id}`}
                left={(props) => <Icon name="tasks" size={24} color="black" />}
                right={(props) => <ButtonIcon iconName="close" color="red" onPress={() => handleDeleteTodo(item.id)} />}
              />
              <Card.Content>
                <Paragraph>{item.task}{item.asignee}</Paragraph>
              </Card.Content>
            </Card>
            <Spacer />
            </>
          );
        }}
      />
      <Spacer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 10,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

const mapStateToProps = (state, ownProps) => {
  return {
    todo_list: state.todos.todo_list,
  }
}

const mapDispatchToProps = { addTodo,addAsignee, deleteTodo }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoApp)
