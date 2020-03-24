<template>
  <div class="container">
    <mdb-container>
        <mdb-card>
            <h3 class="card-header pink lighten-1 white-text text-center font-weight-bold text-uppercase py-4">CRUD with Spring Boot & Vue.Js</h3>
        </mdb-card>
    </mdb-container>
    <div class="container">
        <mdb-tbl btn responsive striped>
        <mdb-tbl-head class="pink lighten-2 white-text text-center font-weight-bold text-uppercase">
            <tr>
                <th>Id</th>
                <th>Course</th>
                <th>Description</th>
                <th>Update</th>
                <th>Delete</th>
            </tr>
        </mdb-tbl-head>
        <mdb-tbl-body class="pink lighten-5 black-text text-center">
            <tr 
            v-for="(tutorial, index) in tutorials"
            :index="index"
            :title="tutorial.title"
            :description="tutorial.description"
            :key="index"
            >
                <td>{{ tutorial.id }}</td>
                <td>{{ tutorial.title }}</td>
                <td>{{ tutorial.description }}</td>
                <td>
                    <button type="button" class="btn btn-primary btn-sm m-0" @click="update = true">Update</button>
                    <mdb-modal v-if="update" @close="update = false">
                        <mdb-modal-header>
                            <mdb-modal-title tag="h4" class="w-100 text-center font-weight-bold">Update Course</mdb-modal-title>
                        </mdb-modal-header>
                        <mdb-modal-body>
                            <form class="mx-3 grey-text">
                               <mdb-input
                                   label="Title"
                                   v-model="tutorial.title"
                                />
                                <mdb-input
                                   label="Description"
                                   v-model="tutorial.description"
                                />  
                            </form>
                        </mdb-modal-body>
                        <mdb-modal-footer class="justify-content-center">
                            <mdb-btn outline="unique" @click="updateCourse(tutorial.id, tutorial)">Update</mdb-btn>
                        </mdb-modal-footer>
                    </mdb-modal>
                </td>
                <td>
                    <button type="button" class="btn btn-danger btn-sm m-0" @click="deleteRow(tutorial.id)">Delete</button>
                </td>
            </tr>
        </mdb-tbl-body>
        </mdb-tbl>
        <mdb-container>
            <mdb-row>
                <mdb-col xl="3" md="6" class="mx-auto text-center">
                    <mdb-btn color="pink" @click.native="modal = true">Add</mdb-btn>
                </mdb-col>
            </mdb-row>
            <mdb-modal v-if="modal" @close="modal = false" primary>
                <mdb-modal-header>
                    <mdb-modal-title tag="h4" class="w-100 text-center font-weight-bold">Add Courses</mdb-modal-title>
                </mdb-modal-header>
                <mdb-modal-body>
                    <form class="mx-3 grey-text">
                        <mdb-input
                          name="title"
                          label="Title"
                          id="title"
                          icon="sticky-note"
                          type="text"
                          v-model="form.title"
                        />
                        <mdb-input
                          name="description"
                          label="Description"
                          id="description"
                          icon="sticky-note"
                          type="text"
                          v-model="form.description"
                        />
                    </form>
                </mdb-modal-body>
                <mdb-modal-footer class="justify-content-center">
                    <mdb-btn outline="unique" @click.native="addCourse">Add</mdb-btn>
                </mdb-modal-footer>
            </mdb-modal>
        </mdb-container>
    </div>
  </div>
</template>

<script>
  import CourseDataService from '../service/CourseDataService'
  import { 
      mdbTbl, 
      mdbTblHead, 
      mdbTblBody, 
      mdbContainer, 
      mdbRow, 
      mdbCol, 
      mdbBtn, 
      mdbModal,
      mdbModalHeader,
      mdbModalTitle,
      mdbModalBody,
      mdbModalFooter,
      mdbInput,
      mdbCard } from 'mdbvue';

  export default {
    name: 'TableAdditionalPage',
    components: {
      mdbTbl,
      mdbTblHead,
      mdbTblBody,
      mdbContainer, 
      mdbRow, 
      mdbCol,
      mdbBtn,
      mdbModal,
      mdbModalHeader,
      mdbModalTitle,
      mdbModalBody,
      mdbModalFooter,
      mdbInput,
      mdbCard
    },
    data() {
        return {
            tutorials: [],
            modal: false,
            newValues: [],
            form: {
                title: '',
                description: '',
                published: false
            },
            submitted: false,
            update: false
        };
    },
    async mounted() {
        this.load()
    },
    methods: {  
        async load() {
            const response = await CourseDataService.retrieveAllCourse()
            this.tutorials = response.data;
        },
        async addCourse() {
            var data = {
                title: this.form.title,
                description: this.form.description
            }
            const response = await CourseDataService.createCourse(data)
            this.tutorials = [...this.tutorials, response.data]
            this.form.title = '',
            this.form.description = ''
            this.submitted = true;
        },
        deleteRow: async function(id) {
            await CourseDataService.deleteCourse(id)
            this.load();  
        },
        updateCourse: async function(id, data) {
            const response = await CourseDataService.updateCourse(id, data)
            this.tutorials = [...this.tutorials, response.data]
            this.load();
        }
    }
  }
</script>