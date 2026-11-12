# User Interface Contract: Young Details

## Profile form

- Opening a young-person details route loads the record identified by that route's ID and populates the saved name, age, and gender.
- While the profile is loading, the screen does not present a fabricated sample record and profile saving is unavailable. If the record is absent or profile/detail data loading fails, the screen displays a toast with the exact text **“Não foi possível exibir as informações do jovem. Tente novamente”** for two seconds, then returns to the previous screen using back navigation. Do not display a fabricated profile.
- The **Salvar** action is unavailable until the profile is loaded and name (after trimming), age text, and selected gender all have values. Invalid ages remain subject to the existing validation when submitted.
- When available, **Salvar** retains its existing validation and in-screen state update behavior; this feature does not add profile-edit persistence.
- The action uses the app bar's required `bg-sky-700` background. Its disabled appearance must remain distinguishable without replacing that background color.

## Progress-entry form

- The **Adicionar relato** action is unavailable for empty or whitespace-only text and available for non-whitespace text.
- Existing validation, including the 1,000-character limit, and existing persistence behavior remain in force.
- After successful submission, the report is displayed in the existing history and the input is cleared, making the action unavailable until new text is entered.
- The action uses the same `bg-sky-700` background and distinguishable disabled treatment as the profile action.

## Non-goals

- No changes to route destinations, database schema, profile-update persistence, report ordering, or delete behavior. Error recovery returns to the preceding screen after the toast has been visible for two seconds.