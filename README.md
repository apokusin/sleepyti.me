### Thank you David Shaw!

Without your original code, I wouldn't have been able to create the awesome design!

## Functionality

The site functions as an optimal bedtime calculator. It runs on the fact that most adult humans have sleep cycles that last 90 minutes long. Knowing this, David created a script that counts backwards from a time that the user sets, lapping every 90 minutes, to the current time.

> Taking into account that most adult humans also take about 14 minutes to fall asleep, the 14 minutes is added to the actual time to wake up.

You have two options:

1. Select the time that you would like to wake up
2. See what times would be optimal for awakening if you were to head to bed at the current time.

The top one contains 3 selection boxes: 'Hour', 'Minute', and 'AM/PM'. You can select the time for each of these, and then see 4 results for optimal bed times.

The bottom option contains only a single button with the label: 'Zzz'. You can click it and see 6 optimal awakening times. The last three times are the 4th through 6th sleep cycles, so they are colored green rather than red. Five to six sleep cycles are the optimal sleeping times for adult humans.

## In conclusion

The last option is a simple "Reset" button, where the user can click it to return to the original state of the site.

**Hope you enjoy it!**

## Planning phase

The final result will be result will be displayed as a digit version of time zone clocks.

The times will be shown horizontally. The labels will be shown below each of each clock.

#### Concept Image:

![Digital Concept Image](https://github.com/apokusin/sleepyti.me/raw/master/digital_concept.png)


## Original Readme
sleepyti.me is a Javascript/jQuery based bedtime calculator that helps you decide when
to go to sleep. It works by counting backwards in 90-minute sleep cycles so
that you wake up refreshed and alert (instead of tired and groggy).

The main website can be viewed at http://sleepyti.me, or by viewing the "raw
source" of this github project.