using System;
using System.Collections.Generic;

namespace CodeWars
{
    /*
       * Write a function, persistence,
        that takes in a positive parameter num and returns its multiplicative persistence,
         which is the number of times you must multiply the digits in num until you reach a single digit.

    For example:

    persistence(39) == 3 // because 3*9 = 27, 2*7 = 14, 1*4=4
                        // and 4 has only one digit

    persistence(999) == 4 // because 9*9*9 = 729, 7*2*9 = 126,
                         // 1*2*6 = 12, and finally 1*2 = 2

    persistence(4) == 0 // because 4 is already a one-digit number
      */
    public class Persist
    {
        private static int _count = 0;

        public static int Persistence(long n)
        {
            _count = 0;
            return CountPersistence(n);
        }

        private static int CountPersistence(long n)
        {
            string s = n.ToString();
            var nums = new List<long>();
            long result = 1;

            Console.WriteLine(_count.ToString());

            if (s.Length == 1)
            {
                return _count;
            }

            for (int i = 0; i < s.Length; i++)
            {
                nums.Add(Convert.ToInt64(s.Substring(i, 1)));
            }

            foreach (var item in nums)
            {
                result *= item;
            }
            _count++;

            return CountPersistence(result);
        }
    }
}