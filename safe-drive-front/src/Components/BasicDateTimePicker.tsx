import * as React from 'react';
import {DemoContainer} from '@mui/x-date-pickers/internals/demo';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';

interface DateTimePickerPros {
    selectedDateTime: any;
    setSelectedDateTime: (time: any) => void;
}

function BasicDateTimePicker(pros: DateTimePickerPros) {

    // Event handler to handle the change in the date/time picker
    const handleDateTimeChange = (newDateTime: any) => {
        pros.setSelectedDateTime(newDateTime);
        // You can perform additional actions with the selectedDateTime value
        console.log("Selected Date/Time:", newDateTime);
    };
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateTimePicker']}>
                <DateTimePicker
                    label="Basic date time picker"
                    value={pros.selectedDateTime} // Set the value of the picker
                    onChange={handleDateTimeChange} // Handle change event
                />
            </DemoContainer>
        </LocalizationProvider>
    );
}


export default BasicDateTimePicker;
