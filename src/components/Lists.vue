<template>
  <div class="list-wrap border-primary bg-light">
    <b-modal
        v-model="AcceptModal.show"
        :title="AcceptModal.title"
        @ok="DelList(listToDelete)"
    >
      <p>{{AcceptModal.message}}</p>
    </b-modal>
    <b-modal
        v-model="SuccessModal.show"
        :title="SuccessModal.title"
    >
      <p>{{SuccessModal.message}}</p>
    </b-modal>
    <b-modal
        v-model="ErrorModal.show"
        :title="ErrorModal.title"
    >
      <p class="text-danger">{{ErrorModal.message}}</p>
    </b-modal>
    <b-form-select class="my-3 mx-5" style="width: unset" v-model="filterID" :options="filters"></b-form-select>
    <div class="hr" />
    <b-list-group class="lists">
      <transition-group name="slide-fade">
        <b-list-group-item v-for="list in listsFiltered" :key="list.id" :style="`background-color: ${list.color}; transition: all .3s ease`" >
          <div class="row no-gutters justify-content-between">
            <router-link :to="list.link" class="row no-gutters justify-content-between align-items-center">
              <div class="mx-1">{{list.title}}</div>
            </router-link>
            <b-button class="mx-1" variant="danger" @click="ShowAcceptModal(list)">Delete</b-button>
          </div>

        </b-list-group-item>
      </transition-group>
    </b-list-group>
    <div class="hr"></div>
    <form @submit.prevent="NewList" class="d-flex flex-column">
      <div class="px-1">
        <b-input placeholder="Название списка" v-model="newListTitle" />
      </div>
      <b-button class="align-self-end m-1" variant="primary" type="submit">Создать список</b-button>
      <span>&copy; 2020
        <a href="https://d0rich.github.io" target="_blank">Nikolay Dorofeev (d0rich)</a>
      </span>
    </form>
  </div>
</template>

<script>
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
import {List} from "@/classes";
export default {
name: "Lists",
  data(){
  return{
    newListTitle:'',
    listToDelete: {},
    filterID: 1,
    filters:[
      {value: 1, text: 'Неисполненные'},
      {value: 2, text: 'Исполненные'},
      {value: 3, text: 'Все'}
    ],
    AcceptModal: {
      show: false,
      title: 'Вы уверены в своих действиях?',
      message: ''
    },
    ErrorModal: {
      show: false,
      title: 'Ошибка',
      message: ''
    },
    SuccessModal: {
      show: false,
      title: 'Успешно',
      message: ''
    }
  }
  },
  computed:{
    ...mapState(['lists']),
    ...mapGetters(['onLoad']),
    listsFiltered(){
      if (this.filterID === 1) return this.lists.filter(l => l.type === 1 || l.type === 2)
      if (this.filterID === 2) return this.lists.filter(l => l.type === 3)
      else return this.lists
    }
  },
  methods:{
    ...mapActions(['GetLists', 'CreateList', 'DeleteList']),
    ...mapMutations(['DeleteListLocally']),
    ShowAcceptModal(listToDelete){
      this.AcceptModal.show = true
      this.AcceptModal.message = `Удалить список дел "${listToDelete.title}"?`
      this.listToDelete = listToDelete
    },
    ShowErrorModal(message){
      this.ErrorModal.show = true
      this.ErrorModal.message = message
    },
    ShowSuccessModal(message){
      this.SuccessModal.show = true
      this.SuccessModal.message = message
    },
    NewList(){
      this.CreateList(this.newListTitle)
        .then(() => {
          this.GetLists()
          this.ShowSuccessModal(`Список дел "${this.newListTitle}" добавлен`)
          this.newListTitle = ''
        })
        .catch(err => {
          this.ShowErrorModal(err.message)
        })
    },
    DelList(list = new List({})){
      this.DeleteList(list.id)
          .then(() => {
            this.DeleteListLocally(list)
          })
    }
  }
}
</script>

<style scoped>
.list-wrap{
  height: 80vh;
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  border-radius: 3px;
  padding: 10px;
  -webkit-box-shadow: 18px 16px 27px 19px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 18px 16px 27px 19px rgba(34, 60, 80, 0.2);
  box-shadow: 18px 16px 27px 19px rgba(34, 60, 80, 0.2);
}
.lists{
  overflow-x: hidden;
  overflow-y: auto;
  height: 100%;
}

</style>
