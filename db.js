import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const dbApi = createApi({
  reducerPath: "dbApi",
  tagTypes: ["Notes", "Folders"],
  baseQuery: fakeBaseQuery(),
  endpoints: (build) => ({
    fetchNotes: build.query({
      async queryFn() {
        const serializedNotes = await AsyncStorage.getItem("notes");
        const notes = JSON.parse(serializedNotes);

        return { data: [notes] };
      },
      providesTags: (result) => ["Notes"],
    }),
    // A method to fetch all user created folders.
    fetchFolders: build.query({
      async queryFn() {
        const serializedFolders = await AsyncStorage.getItem("folders");
        const folders = JSON.parse(serializedFolders);

        return { data: [folders] };
      },
      providesTags: (result) => ["Folders"],
    }),
    searchNotes: build.query({
      async queryFn(searchString) {
        const serializedNotes = await AsyncStorage.getItem("notes");

        const notes = JSON.parse(serializedNotes);

        if (searchString == "") {
          return { data: notes };
        } else {
          const filteredNotes = notes.filter((note) => {
            const { title, content } = note;
            const s = searchString.toLowerCase();
            return (
              title.toLowerCase().indexOf(s) !== -1 ||
              content.toLowerCase().indexOf(s) !== -1
            );
          });

          return { data: filteredNotes || [] };
        }
      },
      providesTags: (result) => ["Notes"],
    }),
    addNote: build.mutation({
      async queryFn(note) {
        const serializedNotes = await AsyncStorage.getItem("notes");
        const notes = JSON.parse(serializedNotes) || [];
        note.id = uuid.v4();
        notes.unshift(note);
        await AsyncStorage.setItem("notes", JSON.stringify(notes));
        return { data: note };
      },
      invalidatesTags: ["Notes"],
    }),
    // A method to save user created folder
    addFolder: build.mutation({
      async queryFn(folder) {
        const serializedFolders = await AsyncStorage.getItem("folders");
        const folders = JSON.parse(serializedFolders) || [];
        const alreadyExists = folders.find(
          (item) => item.title === folder.title
        );

        if (alreadyExists) return { data: folder };

        folder.id = uuid.v4();
        folders.unshift(folder);
        await AsyncStorage.setItem("folders", JSON.stringify(folders));
        return { data: folder };
      },
      invalidatesTags: ["Folders"],
    }),
    deleteNote: build.mutation({
      async queryFn(note) {
        const serializedNotes = await AsyncStorage.getItem("notes");
        let notes = JSON.parse(serializedNotes) || [];
        notes = notes.filter((x) => x.id !== note.id);
        await AsyncStorage.setItem("notes", JSON.stringify(notes));
        return { data: note };
      },
      invalidatesTags: ["Notes"],
    }),
    // A method to delete user created folder
    deleteFolder: build.mutation({
      async queryFn(folder) {
        const serializedFolders = await AsyncStorage.getItem("folders");
        let folders = JSON.parse(serializedFolders) || [];
        folders = folders.filter((x) => x.id !== folder.id);
        await AsyncStorage.setItem("folders", JSON.stringify(folders));
        return { data: folder };
      },
      invalidatesTags: ["Folders"],
    }),
    deleteMultipleNotes: build.mutation({
      async queryFn(notesToDelete) {
        const serializedNotes = await AsyncStorage.getItem("notes");
        let notes = JSON.parse(serializedNotes) || [];
        notes = notes.filter(
          (x) => !notesToDelete.some((note) => x.id === note.id)
        );

        await AsyncStorage.setItem("notes", JSON.stringify(notes));
        return { data: notesToDelete };
      },
      invalidatesTags: ["Notes"],
    }),
    updateNote: build.mutation({
      async queryFn(note) {
        const serializedNotes = await AsyncStorage.getItem("notes");
        const notes = JSON.parse(serializedNotes) || [];
        const updatedNotes = notes.map((n) => {
          if (n.id === note.id) {
            return {
              ...n,
              title: note.title,
              cat: note.cat,
              content: note.content,
              date: note.date,
            };
          }
          return n;
        });
        await AsyncStorage.setItem("notes", JSON.stringify(updatedNotes));
        return { data: note };
      },
      invalidatesTags: ["Notes"],
    }),
  }),
});

export const {
  useFetchNotesQuery,
  useFetchFoldersQuery,
  useSearchNotesQuery,
  useAddNoteMutation,
  useAddFolderMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
  useDeleteFolderMutation,
  useDeleteMultipleNotesMutation,
} = dbApi;
