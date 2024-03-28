<template>
  <div class="flex flex-col items-center justify-center bg-gray-50">
    <NuxtLayout name="dashboard">
      <template #sidebar>
        <div class="pb-2">
          <p class="py-3 text-gray-800 text-sm font-bold flex items-center">
            WORDS LIST
          </p>
          <textarea
            id="word_search_form_wordsList"
            v-model="wordsList"
            name="word_search_form[wordsList]"
            required="required"
            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 h-40"
          ></textarea>
          <div class="mb-4 text-red-600"></div>
        </div>

        <div class="-mt-[1px]">
          <div
            class="flex items-center justify-between cursor-pointer border-y"
          >
            <p class="py-3 text-gray-800 text-sm font-bold flex items-center">
              GRID
            </p>
          </div>
          <div class="py-4 pl-4">
            <div class="mb-3 flex items-center justify-between">
              <label
                class="mr-4 text-sm font-medium text-gray-900 required"
                for="word_search_form_gridSize"
                >Size</label
              >
              <select
                id="word_search_form_gridSize"
                v-model="gridSize"
                name="word_search_form[gridSize]"
                class="bg-gray-100 text-gray-900 sm:text-sm rounded focus:ring-indigo-600 focus:border-indigo-600 block p-2"
              >
                <option v-for="size in gridSizes" :key="size" :value="size">
                  {{ size }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <div class="-mt-[1px]">
          <div
            class="flex items-center justify-between cursor-pointer border-y"
          >
            <p class="py-3 text-gray-800 text-sm font-bold flex items-center">
              BORDER
            </p>
            <label class="relative inline-flex items-center cursor-pointer">
              <input
                id="word_search_form_externalBorder"
                v-model="border"
                type="checkbox"
                name="word_search_form[externalBorder]"
                class="sr-only peer"
              />
              <div
                class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"
              ></div>
            </label>
          </div>
          <div class="py-4 pl-4">
            <div class="grid grid-cols-[0.5fr_1fr] items-center">
              <label
                class="mr-4 text-sm font-medium text-gray-900 required"
                for="word_search_form_borderColor"
                >Color</label
              >
              <div class="p-2 bg-gray-100 rounded-md flex items-center">
                <div class="h-7 w-7 rounded overflow-hidden">
                  <input
                    id="word_search_form_borderColor"
                    v-model="borderColor"
                    type="color"
                    name="word_search_form[borderColor]"
                    class="bg-transparent block h-[200%] w-[200%] -translate-x-[25%] -translate-y-[25%]"
                    :disabled="!border"
                  />
                </div>
                <span class="ml-2 text-gray-600">{{ borderColor }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="fixed bottom-0 left-0 right-0 py-4 px-4 border-t bg-white">
          <button
            type="submit"
            class="text-white bg-black hover:opacity-90 w-full font-bold rounded-md text-sm px-5 py-3 mr-2 mb-2 focus:outline-none block"
            @click="generateBoard"
          >
            Generate
          </button>
          <button
            type="submit"
            class="text-black border border-black hover:opacity-80 bg-gray-200 w-full font-bold rounded-md text-sm px-5 py-3 mr-2 mb-2 focus:outline-none block"
            @click="exportBoards"
          >
            Export
          </button>
        </div>
      </template>

      <div v-if="generatedBoards.length">
        <div
          v-for="({ board, settings }, index) in generatedBoards"
          :key="index"
        >
          <div class="mb-2 flex items-center justify-between">
            <p class="text-sm font-bold">Page {{ index + 1 }}</p>
            <div class="flex gap-2 items-center">
              <button @click="removeBoard(index)">
                <TrashIcon class="w-5 h-5" />
              </button>
            </div>
          </div>
          <svg
            :id="`board-${index}`"
            xmlns="http://www.w3.org/2000/svg"
            width="500"
            height="750"
            class="bg-white shadow-lg mb-8 px-4"
          >
            <g class="bg-white shadow-lg mb-8 py-12 px-4">
              <text
                class="text-center font-black mb-4 text-xl"
                x="50%"
                y="60"
                text-anchor="middle"
              >
                Puzzle #{{ index + 1 }}
              </text>
              <g>
                <rect
                  v-if="settings.border"
                  x="0"
                  y="75"
                  :width="466"
                  :height="500"
                  fill="none"
                  :stroke="settings.borderColor"
                  :stroke-width="settings.borderWidth"
                />
                <g v-for="(row, rowIndex) in board" :key="rowIndex">
                  <g v-for="(cell, cellIndex) in row" :key="cellIndex">
                    <text
                      :x="(cellIndex * (466 / settings.size)) + (466 / (settings.size * 2))"
                      :y="
                        rowIndex * (500 / settings.size) +
                        500 / (settings.size * 2) +
                        80
                      "
                      text-anchor="middle"
                    >
                      {{ cell }}
                    </text>
                  </g>
                </g>
              </g>
              <g class="grid grid-cols-4 gap-2 mt-4">
                <text
                  v-for="(word, wordIndex) in settings.words"
                  :key="wordIndex"
                  :x="(wordIndex % 4) * 100 + 10"
                  :y="Math.floor(wordIndex / 4) * 30 + 610"
                >
                  {{ word }}
                </text>
              </g>
            </g>
          </svg>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { jsPDF } from "jspdf";
import { TrashIcon } from "@heroicons/vue/24/outline";
import type {
  IWordSearchBoard,
  IWordSearchPosition,
} from "~/types/IWordSearchData";

definePageMeta({
  layout: false,
});

const gridSizes = [5, 10, 15, 20, 25, 30];
const gridSize = ref(10);
const uppercase = ref(true);

const border = ref(true);
const borderWidth = ref(1);
const borderRadius = ref(5);
const borderColor = ref("#000000");

const generatedBoards = ref<IWordSearchBoard[]>([]);
const wordsList = ref<string>("");

const generateBoard = () => {
  if (!wordsList.value) return;

  const board: string[][] = Array.from({ length: gridSize.value }, () =>
    Array(gridSize.value).fill(""),
  );
  const words = wordsList.value
    .split("\n")
    .filter((word) => word.trim() !== "");

  words.forEach((word) => {
    let placed = false;

    for (let attempt = 0; attempt < 100 && !placed; attempt++) {
      const randomDirection = getRandomDirection();
      const randomPosition = getRandomPosition();

      if (canPlaceWord(board, word, randomPosition, randomDirection)) {
        placeWord(board, word, randomPosition, randomDirection);
        placed = true;
      }
    }
  });

  fillEmptyCells(board);

  const newBoard: IWordSearchBoard = {
    board,
    settings: {
      size: gridSize.value,
      uppercase: uppercase.value,
      border: border.value,
      borderWidth: borderWidth.value,
      borderColor: borderColor.value,
      words,
    },
  };

  generatedBoards.value.push(newBoard);

  resetInputData();
};

const exportBoards = () => {
  const doc = new jsPDF();
  const scaleFactor = 2;

  generatedBoards.value.forEach((boardData, index) => {
    const boardElement = document.getElementById(`board-${index}`);
    const currentDate = Date.now();

    if (!boardElement) {
      return console.error(`Board element with ID board-${index} not found`);
    }

    const svgString = new XMLSerializer().serializeToString(boardElement);
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    if (!context) {
      return console.error("Canvas context is null");
    }

    const img = new Image();

    img.onload = () => {
      canvas.width = img.width * scaleFactor;
      canvas.height = img.height * scaleFactor;
      context.drawImage(img, 0, 0, canvas.width, canvas.height);

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const imageData = canvas.toDataURL("image/png");
      doc.addImage(imageData, "PNG", 10, 10, pageWidth - 10, pageHeight - 20);

      if (index < generatedBoards.value.length - 1) {
        doc.addPage();
      } else {
        doc.save(`word-search-${currentDate}.pdf`);
      }
    };
    img.src = `data:image/svg+xml;base64,${btoa(svgString)}`;
  });
};

const removeBoard = (index: number) => {
  generatedBoards.value.splice(index, 1);
};

const getRandomDirection = (): IWordSearchPosition => {
  const directions: IWordSearchPosition[] = [
    { row: -1, col: 0 }, // Up
    { row: 0, col: 1 }, // Right
    { row: 1, col: 0 }, // Down
    { row: 0, col: -1 }, // Left
    { row: 1, col: 1 }, // Diagonal up
    { row: -1, col: 1 }, // Diagonal down
    { row: -1, col: -1 }, // Diagonal up-left
    { row: 1, col: -1 }, // Diagonal down-left
  ];
  return directions[Math.floor(Math.random() * directions.length)];
};

const getRandomPosition = (): IWordSearchPosition => {
  return {
    row: Math.floor(Math.random() * gridSize.value),
    col: Math.floor(Math.random() * gridSize.value),
  };
};

const canPlaceWord = (
  board: string[][],
  word: string,
  position: IWordSearchPosition,
  direction: IWordSearchPosition,
): boolean => {
  let { row, col } = position;

  for (let i = 0; i < word.length; i++) {
    if (
      row < 0 ||
      row >= gridSize.value ||
      col < 0 ||
      col >= gridSize.value ||
      (board[row][col] !== "" && board[row][col] !== word[i])
    ) {
      return false;
    }

    row += direction.row;
    col += direction.col;
  }

  return true;
};

const placeWord = (
  board: string[][],
  word: string,
  position: IWordSearchPosition,
  direction: IWordSearchPosition,
) => {
  let { row, col } = position;

  for (const char of word) {
    board[row][col] = char.toUpperCase();
    row += direction.row;
    col += direction.col;
  }
};

const fillEmptyCells = (board: string[][]) => {
  for (let row = 0; row < gridSize.value; row++) {
    for (let col = 0; col < gridSize.value; col++) {
      if (board[row][col] === "") {
        board[row][col] = getRandomLetters();
      }
    }
  }
};

const getRandomLetters = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return letters.charAt(Math.floor(Math.random() * letters.length));
};

const resetInputData = () => {
  wordsList.value = "";
};
</script>

<style scoped></style>
