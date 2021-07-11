using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

namespace StringsMix
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            string result;
            result = Mixing.Mix("looping is fun but dangerous", "less dangerous than coding");

            Console.WriteLine(result); //1:ooo/1:uuu/2:sss/=:nnn/1:ii/2:aa/2:dd/2:ee/=:gg

            result = Mixing.Mix(" In many languages", " there's a pair of functions");
            Console.WriteLine(result); // "1:aaa/1:nnn/1:gg/2:ee/2:ff/2:ii/2:oo/2:rr/2:ss/2:tt"
        }
    }

    public class Mixing
    {
        public static string Mix(string s1, string s2)
        {
            Console.WriteLine($"s1:{s1}");
            Console.WriteLine($"s2:{s2}");

            var mixs1 = CountWords('1', s1);
            var mixs2 = CountWords('2', s2);

            return string.Empty;
        }

        private static List<Mixs> CountWords(char key, string s)
        {
            Regex reg = new Regex("[a-z]");
            var dic = new Dictionary<string, List<string>>();
            List<string> repeats;
            var words = s
                       .Select(s => s.ToString())
                       .Where(s => reg.IsMatch(s))
                       .OrderBy(s => s)
                       .ToList();

            foreach (string word in words)
            {
                if (dic.ContainsKey(word))
                {
                    repeats = dic[word];
                    repeats.Add(word);
                }
                else
                {
                    repeats = new List<string>
                    {
                        word
                    };
                    dic.Add(word, repeats);
                }
            }

            var mixs = dic
                .Where(keyValue => keyValue.Value.Count > 1)
                .Select(keyValue => new Mixs
                {
                    Key = key,
                    Word = keyValue.Key,
                    Count = keyValue.Value.Count
                })
                .ToList();

            return mixs;
        }

        private static string CompareWords(
            List<Mixs> mixs1,
            List<Mixs> mixs2)
        {
            var results = new List<Mixs>();

            foreach (var mix in mixs1)
            {
                var item = mixs2
                    .Where(m => m.Word == mix.Word)
                    .FirstOrDefault();

                if (item == null)
                {
                }
                else
                {
                }
            }

            var values = results
                .OrderByDescending(r => r.Count)
                .ThenBy(r => ((short)r.Key))
                .ThenBy(r => r.Word)
                .Select(r => r.Value);

            return string.Join("/", values);
        }

        private class Mixs
        {
            public char Key { get; set; }

            public string Word { get; set; }

            public int Count { get; set; }

            public string Value { get; set; }
        }
    }
}