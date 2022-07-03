<script setup>
import { ref, onMounted } from "vue";
import draggable from "vuedraggable";

const courses = ref([]);
const callCourseApi = () => {
  fetch("/api/course", {
    headers: { "Content-type": "application/json" },
  })
    .then((response) => response.json())
    .then((response) => {
      courses.value = response;
    })
    .catch((err) => console.error(err));
};

const getData = () => {
  fetch("https://api.openbrewerydb.org/breweries/5494", {
    headers: { "Content-type": "application/json" },
  })
    .then((res) => res.json())
    .then((response) => {
      console.log({ response });
    })
    .catch((error) => {
      console.log("Looks like there was a problem: \n", error);
    });
};

onMounted(() => {
  callCourseApi();
});
// const courses = {
//   1: {
//     "Course title": "CALCULUS",
//     Credits: 2,
//     Instructor: "Peter",
//     "Curriculum Number": "MATH4008",
//   },
//   2: {
//     "Course title": "Object-oriented Software Design",
//     Credits: 2,
//     Instructor: "Paul",
//     "Curriculum Number": "CSIE1211",
//   },
//   3: {
//     "Course title": "Discrete Mathematics",
//     Credits: 3,
//     Instructor: "Kelly",
//     "Curriculum Number": "CSIE2122",
//   },
//   4: {
//     "Course title": "Probability",
//     Credits: 2,
//     Instructor: "Tina",
//     "Curriculum Number": "CSIE2121",
//   },
//   5: {
//     "Course title": "Foundations of Artificial Intelligence",
//     Credits: 2,
//     Instructor: "Anna",
//     "Curriculum Number": "CSIE3005",
//   },
//   6: {
//     "Course title": "Operating Systems",
//     Credits: 2,
//     Instructor: "Bruce",
//     "Curriculum Number": "CSIE3310",
//   },
// };

const chosenCourses = ref([]);

const addCourse = (course) => {
  if (
    chosenCourses.value
      .map((e) => e["Course title"])
      .indexOf(course["Course title"]) === -1
  )
    chosenCourses.value.push({
      "Course title": course["Course title"],
    });
};

const removeCourse = (course) => {
  const index = chosenCourses.value
    .map((e) => e["Course title"])
    .indexOf(course["Course title"]);
  //console.log(index);
  if (index !== -1) chosenCourses.value.splice(index, 1);
};

const getChosenCoursesIndex = (course) =>
  chosenCourses.value
    .map((e) => e["Course title"])
    .indexOf(course["Course title"]) + 1;

let result = ref([]);
const getResult = () => {
  result.value.length = 0;
  chosenCourses.value.forEach((e) => result.value.push(e["Course title"]));
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
            @click="addCourse(course)"
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
        <div class="flex justify-end mx-4 mt-4">
          <button
            type="button"
            class="text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-500 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            @click="getResult()"
          >
            Done
          </button>
        </div>
        <!-- chosen course block -->
        <draggable
          v-model="chosenCourses"
          group="chosen_course"
          item-key="Course title"
          handle=".handle"
          class="mx-6 my-2"
        >
          <template #item="{ element }">
            <div
              class="flex p-2 w-90 text-sm font-medium text-gray-900 bg-white border border-gray-200 dark:bg-gray-300 dark:border-gray-600"
            >
              <!-- drag button -->
              <button class="handle">
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
                {{ getChosenCoursesIndex(element) }}
              </div>
              <div>
                {{ element["Course title"] }}
              </div>
              <!-- delete button -->
              <button class="ml-auto" @click="removeCourse(element)">
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
          </template>
        </draggable>
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
