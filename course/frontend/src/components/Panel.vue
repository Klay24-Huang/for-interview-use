<script setup>
import { reactive } from "vue";
import draggable from "vuedraggable";

const courses = {
  1: {
    "Course title": "CALCULUS",
    Credits: 2,
    Instructor: "Peter",
    "Curriculum Number": "MATH4008",
  },
  2: {
    "Course title": "Object-oriented Software Design",
    Credits: 2,
    Instructor: "Paul",
    "Curriculum Number": "CSIE1211",
  },
  3: {
    "Course title": "Discrete Mathematics",
    Credits: 3,
    Instructor: "Kelly",
    "Curriculum Number": "CSIE2122",
  },
  4: {
    "Course title": "Probability",
    Credits: 2,
    Instructor: "Tina",
    "Curriculum Number": "CSIE2121",
  },
  5: {
    "Course title": "Foundations of Artificial Intelligence",
    Credits: 2,
    Instructor: "Anna",
    "Curriculum Number": "CSIE3005",
  },
  6: {
    "Course title": "Operating Systems",
    Credits: 2,
    Instructor: "Bruce",
    "Curriculum Number": "CSIE3310",
  },
};

const chosenCourses = reactive([]);

const addCourse = (course) => {
  if (chosenCourses.indexOf(course) === -1) chosenCourses.push(course);
};

const removeCourse = (course) => {
  const index = chosenCourses.indexOf(course);
  chosenCourses.splice(index, 1);
};

let result = reactive([]);
const getResult = () => {
  while (result.length > 0) {
    result.pop();
  }

  chosenCourses.forEach((e) => result.push(e));
};

// 打api https://ithelp.ithome.com.tw/articles/10278236
</script>

<template>
  <div class="flex items-stretch mx-8">
    <!-- course info list -->
    <div class="w-1/2 mx-2">
      <div class="text-4xl">Course Information</div>
      <!-- course info block -->
      <div>
        <div
          v-for="course in courses"
          :key="course.key"
          class="w-90 text-sm font-medium text-gray-900 bg-white border border-gray-200 dark:bg-gray-500 dark:border-gray-600 dark:text-white"
        >
          <button
            type="button"
            class="w-full px-4 py-2 font-medium text-left border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white"
            @click="addCourse(course['Course title'])"
          >
            <!-- title -->
            <div class="flex justify-between">
              <span class="text-xl">{{ course["Course title"] }}</span>
              <span>{{ course.Credits }} Credits</span>
            </div>
            <div>{{ course.Instructor }}</div>
            <div>{{ course["Curriculum Number"] }}</div>
          </button>
        </div>
      </div>
    </div>
    <!-- course controller -->
    <div class="w-1/2 mx-2 flex flex-col">
      <div class="text-4xl text-orange-400 text-center">
        Course I Plan To Take
      </div>
      <div class="flex-1 bg-green-600">
        <div class="flex justify-end">
          <button
            type="button"
            class="text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-500 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            @click="getResult()"
          >
            Done
          </button>
        </div>
        <!-- chosen course block -->
        <div class="mx-6 my-2">
          <div
            v-for="(chosenCourse, index) in chosenCourses"
            :key="chosenCourse"
            class="p-2 w-90 text-sm font-medium text-gray-900 bg-white border border-gray-200 dark:bg-gray-300 dark:border-gray-600"
          >
            <div class="flex">
              <!-- drag button -->
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4 8h16M4 16h16"
                  />
                </svg>
              </button>
              <div class="dark:bg-gray-400 w-6 mr-2">
                {{ index + 1 }}
              </div>
              <div>
                {{ chosenCourse }}
              </div>
              <!-- delete button -->
              <button class="ml-auto" @click="removeCourse(chosenCourse)">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- result -->
  <div v-if="result.length > 0">Result: {{ result }}</div>
</template>

<style scoped>
a {
  color: #42b983;
}
</style>
